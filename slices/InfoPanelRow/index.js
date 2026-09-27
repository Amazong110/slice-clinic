"use client";

import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";

export default function InfoPanelRow({ slice }) {
  const items = slice.primary?.items || [];

  return (
    <section
      id="services"
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="clinic-wrap">
        <div className="mb-10 max-w-2xl">
          <p className="clinic-eyebrow">Services</p>
          <h2 className="clinic-display">Departments that stay coordinated</h2>
          <p className="clinic-lead">
            Four focused desks under one roof — primary care, pediatrics, women’s
            health, and minor procedures — with shared records and clear handoffs.
          </p>
        </div>

        <div className="clinic-practice-grid">
          {items.map((item, index) => {
            const blocks = item.title || [];
            const heading = blocks.find((b) =>
              String(b.type || "").startsWith("heading")
            );
            const paras = blocks.filter((b) => b.type === "paragraph");
            return (
              <motion.article
                key={index}
                className="clinic-card"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.06, 0.24),
                }}
              >
                {heading ? (
                  <h3 className="clinic-card__title">
                    <PrismicRichText
                      field={[heading]}
                      components={{
                        heading1: ({ children }) => <>{children}</>,
                        heading2: ({ children }) => <>{children}</>,
                        heading3: ({ children }) => <>{children}</>,
                        heading4: ({ children }) => <>{children}</>,
                        paragraph: ({ children }) => <>{children}</>,
                      }}
                    />
                  </h3>
                ) : null}
                {paras.length ? (
                  <div className="clinic-card__body">
                    <PrismicRichText
                      field={paras}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="clinic-card__body">{children}</p>
                        ),
                      }}
                    />
                  </div>
                ) : null}
                {item.button_link ? (
                  <PrismicNextLink
                    field={item.button_link}
                    className="clinic-card__link"
                  >
                    {item.button_link.text || "Learn more"}
                  </PrismicNextLink>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
