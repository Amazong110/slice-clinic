"use client";

import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";

export default function Gridimagetext({ slice }) {
  const items = slice.primary?.gridgroup || [];
  if (!items.length) return null;

  return (
    <section
      id="team"
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="clinic-wrap">
        <div className="mb-10 max-w-2xl">
          <p className="clinic-eyebrow">Doctors</p>
          <h2 className="clinic-display">Your care team</h2>
          <p className="clinic-lead">
            Board-certified clinicians with clear specialties. Profiles are
            fictional for this demo template.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const src = item.image?.url;
            const prismicSrc =
              item.image?.prismicSrc ||
              (src?.includes("images.prismic.io") ? src : undefined);
            return (
              <motion.article
                key={index}
                className="clinic-card !p-0 overflow-hidden"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                {src ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={item.image.alt || ""}
                      data-prismic={prismicSrc || undefined}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="prose prose-sm max-w-none prose-headings:font-[family-name:var(--font-display)] prose-headings:text-[color:var(--color-fg)] prose-p:text-[color:var(--color-fg-muted)]">
                    <PrismicRichText field={item.richtext} />
                  </div>
                  {item.link?.url ? (
                    <div className="mt-4">
                      <PrismicNextLink field={item.link} className="clinic-card__link">
                        {item.link.text || "Book"}
                      </PrismicNextLink>
                    </div>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
