"use client";

import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";

export default function TextImage({ slice }) {
  const { image, title, text, button_link } = slice.primary || {};
  const right = slice.variation === "rightImage";
  const src = image?.url;
  const prismicSrc =
    image?.prismicSrc || (src?.includes("images.prismic.io") ? src : undefined);

  return (
    <section
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id={right ? "team-intro" : "visit"}
    >
      <div className="clinic-wrap grid items-center gap-10 md:grid-cols-2">
        <motion.div
          className={right ? "md:order-1" : "md:order-2"}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <p className="clinic-eyebrow">Visit us</p>
          {title ? (
            <div className="clinic-display mb-4">
              <PrismicRichText field={title} />
            </div>
          ) : null}
          {text ? (
            <div className="clinic-lead space-y-3 [&_p]:mb-3 [&_p]:text-[color:var(--color-fg-muted)]">
              <PrismicRichText field={text} />
            </div>
          ) : null}
          {button_link?.text || button_link?.url ? (
            <div className="mt-8">
              <PrismicNextLink
                field={button_link}
                className="clinic-btn clinic-btn--ghost"
              >
                {button_link.text || "Learn more"}
              </PrismicNextLink>
            </div>
          ) : null}
        </motion.div>

        {src ? (
          <motion.div
            className={`overflow-hidden rounded-[var(--radius)] border border-[color:var(--color-border)] ${
              right ? "md:order-2" : "md:order-1"
            }`}
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={image.alt || ""}
                width={image.dimensions?.width || 1600}
                height={image.dimensions?.height || 1200}
                data-prismic={prismicSrc || undefined}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
