"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";

export default function Faqs({ slice }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const items = slice.items || [];

  return (
    <section
      id="faq"
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="clinic-wrap">
        <div className="mb-10 max-w-2xl">
          <p className="clinic-eyebrow">FAQ</p>
          {slice.primary?.title ? (
            <div className="clinic-display">
              <PrismicRichText field={slice.primary.title} />
            </div>
          ) : (
            <h2 className="clinic-display">Insurance & common questions</h2>
          )}
        </div>

        <div className="clinic-faq">
          {items.map((entry, index) => {
            const open = activeIndex === index;
            return (
              <div key={index} className="clinic-faq__item">
                <button
                  type="button"
                  className="clinic-faq__btn"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setActiveIndex(open ? null : index)}
                >
                  <span>
                    <PrismicRichText
                      field={entry.heading}
                      components={{
                        heading1: ({ children }) => <>{children}</>,
                        heading2: ({ children }) => <>{children}</>,
                        heading3: ({ children }) => <>{children}</>,
                        paragraph: ({ children }) => <>{children}</>,
                      }}
                    />
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={reduce ? undefined : { rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl leading-none text-[color:var(--color-accent)]"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={`faq-panel-${index}`}
                      key="panel"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="clinic-faq__panel">
                        <PrismicRichText field={entry.text} />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
