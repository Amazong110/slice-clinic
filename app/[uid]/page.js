import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { remapSliceImages } from "../../lib/media";

export default async function Page({ params }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("secondpage", uid).catch(() => notFound());
  const slices = remapSliceImages(page.data.slices);

  return (
    <>
      {page.data.title ? (
        <div className="clinic-wrap pt-12">
          <h1 className="clinic-display">
            {Array.isArray(page.data.title)
              ? page.data.title.map((b) => b.text).join(" ")
              : String(page.data.title)}
          </h1>
        </div>
      ) : null}
      <SliceZone slices={slices} components={components} />
    </>
  );
}

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const { createClient } = await import(process.cwd() + "/prismicio");
  const { asImageSrc } = await import("@prismicio/client");
  
  const client = createClient();
  const page = await client.getByUID("secondpage", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
