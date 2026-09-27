import { PrismicNextLink } from "@prismicio/next";
import { createClient } from "../prismicio";
import Copyright from "./copyright";
import { FOOTER } from "../lib/seed";

export default async function Footer() {
  let footer = null;
  try {
    footer = await createClient().getSingle("footer");
  } catch {
    footer = null;
  }
  const data = footer?.data;
  const links = data?.QuickLinks?.length ? data.QuickLinks : FOOTER.QuickLinks;
  const name = data?.company_name || FOOTER.company_name;
  const copyExtra = data?.copyright_text || FOOTER.copyright_text;

  return (
    <>
      <footer className="clinic-footer">
        <div className="clinic-wrap">
          <p className="clinic-footer__name">{name}</p>
          {links.length > 0 ? (
            <nav className="clinic-footer__links" aria-label="Footer">
              {links.map((item, i) => (
                <PrismicNextLink key={i} field={item.button_link}>
                  {item.button_text || "Link"}
                </PrismicNextLink>
              ))}
            </nav>
          ) : null}
          <div className="clinic-footer__copy">
            <Copyright name={name} extra={copyExtra} />
          </div>
        </div>
      </footer>
      <p className="clinic-disclaimer">
        Demo content · fictional clinic · This page does not provide medical advice,
        diagnosis, or treatment. Always seek the advice of a qualified health provider
        with any questions you may have regarding a medical condition. In an emergency,
        call your local emergency number.
      </p>
    </>
  );
}
