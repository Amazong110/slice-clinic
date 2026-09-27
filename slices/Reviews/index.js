"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PrismicRichText } from "@prismicio/react";

export default function Reviews({ slice }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [
      Autoplay({
        delay: 7000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const items = slice.items || [];

  return (
    <section
      id="testimonials"
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="clinic-wrap max-w-4xl">
        <div className="mb-10 text-center">
          <p className="clinic-eyebrow">Patients</p>
          {slice.primary?.title ? (
            <div className="clinic-display">
              <PrismicRichText field={slice.primary.title} />
            </div>
          ) : (
            <h2 className="clinic-display">What patients notice</h2>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 text-[color:var(--color-accent)] md:block"
            aria-label="Previous review"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 text-[color:var(--color-accent)] md:block"
            aria-label="Next review"
          >
            →
          </button>

          <div className="overflow-hidden px-2 md:px-12" ref={emblaRef}>
            <div className="flex">
              {items.map((item, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%] px-2">
                  <motion.blockquote
                    className="text-center"
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: selectedIndex === i ? 1 : 0.45 }}
                  >
                    <div className="clinic-review-quote clinic-copy">
                      <PrismicRichText field={item.text} />
                    </div>
                    {item.author ? (
                      <footer className="clinic-review-author">
                        — {item.author}
                      </footer>
                    ) : null}
                  </motion.blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
