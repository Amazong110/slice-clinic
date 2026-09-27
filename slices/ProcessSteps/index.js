"use client";

import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";

export default function ProcessSteps({ slice }) {
  const items = slice.items || [];
  const eyebrow = slice.primary?.eyebrow || "YOUR VISIT";
  const lead = slice.primary?.lead || "";

  return (
    <section
      id="process"
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="clinic-wrap">
        <div className="mb-12 max-w-2xl">
          <p className="clinic-eyebrow">{eyebrow}</p>
          {slice.primary?.title ? (
            <div className="clinic-display">
              <PrismicRichText field={slice.primary.title} />
            </div>
          ) : null}
          {lead ? <p className="clinic-lead">{lead}</p> : null}
        </div>

        <div className="clinic-steps">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="clinic-step__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="clinic-step__title">
                {item.step_title || `Step ${i + 1}`}
              </h3>
              {item.step_body ? (
                <p className="clinic-step__body">{item.step_body}</p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
