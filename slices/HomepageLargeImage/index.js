"use client";

import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Clinic hero — Estuario method: cold UI copy + dominant media plane.
 */
export default function HomepageLargeImage({ slice }) {
  const { image, title, description, button_link } = slice.primary || {};
  const reduce = useReducedMotion();
  const src = image?.url;
  const prismicSrc =
    image?.prismicSrc || (src?.includes("images.prismic.io") ? src : undefined);

  if (!src && !title) return null;

  return (
    <section
      className="clinic-hero"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      aria-label="Hero"
    >
      <div className="clinic-wrap clinic-hero__grid">
        <div className="clinic-hero__copy">
          <motion.p
            className="clinic-eyebrow"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6 }}
          >
            Northvale Clinic
          </motion.p>
          {title ? (
            <motion.div
              className="clinic-copy"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.08 }}
            >
              <PrismicRichText
                field={title}
                components={{
                  heading1: ({ children }) => (
                    <h1 className="clinic-hero__brand">{children}</h1>
                  ),
                  heading2: ({ children }) => (
                    <h1 className="clinic-hero__brand">{children}</h1>
                  ),
                  paragraph: ({ children }) => (
                    <h1 className="clinic-hero__brand">{children}</h1>
                  ),
                }}
              />
            </motion.div>
          ) : (
            <h1 className="clinic-hero__brand">Northvale Clinic</h1>
          )}
          {description ? (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.16 }}
            >
              <PrismicRichText
                field={description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="clinic-hero__lead">{children}</p>
                  ),
                }}
              />
            </motion.div>
          ) : null}
          {button_link?.text || button_link?.url ? (
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.28 }}
            >
              <PrismicNextLink
                field={button_link}
                className="clinic-btn clinic-btn--primary"
              >
                {button_link.text || "Book an appointment"}
              </PrismicNextLink>
            </motion.div>
          ) : null}
        </div>

        {src ? (
          <motion.div
            className="clinic-hero__media"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={image.alt || "Clinic care"}
              width={image.dimensions?.width || 1600}
              height={image.dimensions?.height || 1067}
              data-prismic={prismicSrc || undefined}
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
