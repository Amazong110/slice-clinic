import { createClient } from "../prismicio";
import Header from "./header";
import { NAV } from "../lib/seed";

export default async function HeaderServer() {
  let nav = null;
  try {
    nav = await createClient().getSingle("nav");
  } catch {
    nav = null;
  }
  const data = nav?.data;
  const brandName = data?.brand_name || NAV.brand_name;
  const links = data?.navs?.length ? data.navs : NAV.navs;
  return <Header brandName={brandName} links={links} />;
}
