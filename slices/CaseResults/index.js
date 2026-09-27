"use client";

import { PrismicRichText } from "@prismicio/react";
import { motion, useReducedMotion } from "framer-motion";

export default function CaseResults({ slice }) {
  const items = slice.items || [];
  const eyebrow = slice.primary?.eyebrow || "SELECTED MATTERS";
  const lead = slice.primary?.lead || "";
  const reduce = useReducedMotion();

  return (
    <section
      id="cases"
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="clinic-wrap">
        <div className="mb-10 max-w-2xl">
          <p className="clinic-eyebrow">{eyebrow}</p>
          {slice.primary?.title ? (
            <div className="clinic-display">
              <PrismicRichText field={slice.primary.title} />
            </div>
          ) : null}
          {lead ? <p className="clinic-lead">{lead}</p> : null}
        </div>

        <div className="clinic-cases">
          {items.map((item, i) => {
            const src = item.image?.url;
            const prismicSrc =
              item.image?.prismicSrc ||
              (src?.includes("images.prismic.io") ? src : undefined);
            return (
              <motion.article
                key={i}
                className="clinic-case"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {src ? (
                  <div className="clinic-case__media" style={{ position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={item.image.alt || item.matter || ""}
                      width={item.image.dimensions?.width || 1200}
                      height={item.image.dimensions?.height || 800}
                      data-prismic={prismicSrc}
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="clinic-case__body">
                  {item.year ? <span className="clinic-case__year">{item.year}</span> : null}
                  <h3 className="clinic-case__matter">{item.matter || "Matter"}</h3>
                  {item.outcome ? <p className="clinic-case__outcome">{item.outcome}</p> : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
