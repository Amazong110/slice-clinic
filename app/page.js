import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";
import { remapSliceImages } from "../lib/media";
import { HOME_SLICES } from "../lib/seed";

export async function generateMetadata() {
  try {
    const client = createClient();
    const page = await client.getSingle("home_page");
    return {
      title: page.data.meta_title || "Northvale Clinic",
      description:
        page.data.meta_description ||
        "Primary care and family medicine — clear scheduling, coordinated visits. Demo site.",
    };
  } catch {
    return {
      title: "Northvale Clinic",
      description:
        "Primary care and family medicine — clear scheduling, coordinated visits. Demo site.",
    };
  }
}

export default async function HomePage() {
  let slices = null;
  try {
    const client = createClient();
    const page = await client.getSingle("home_page");
    if (page?.data?.slices?.length) {
      slices = remapSliceImages(page.data.slices);
    }
  } catch {
    slices = null;
  }

  if (!slices?.length) {
    slices = remapSliceImages(HOME_SLICES);
  }

  return <SliceZone slices={slices} components={components} />;
}
