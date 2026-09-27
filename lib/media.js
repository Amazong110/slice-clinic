/**
 * Display helper: prefer local prismic-mirror while keeping
 * original images.prismic.io URL for acceptance / data-prismic.
 */
const ROLE_RE =
  /_(hero_mobile|hero|service1|service2|doctor1|doctor2|doctor3|doctor4|care1|care2|care3|office|visit)\.jpe?g$/i;

export function resolveImage(field) {
  if (!field?.url) return null;
  const prismicSrc =
    field.prismicSrc ||
    (String(field.url).includes("images.prismic.io") ? field.url : null);
  const file = String(prismicSrc || field.url)
    .split("/")
    .pop()
    ?.split("?")[0] || "";
  const m = file.match(ROLE_RE);
  const mirror = m ? `/prismic-mirror/northvale_${m[1].toLowerCase()}.jpg` : null;
  const isLocal = String(field.url).startsWith("/");
  return {
    ...field,
    prismicSrc,
    displaySrc: isLocal ? field.url : mirror || field.url,
    width: field.dimensions?.width || field.width || 1600,
    height: field.dimensions?.height || field.height || 1067,
    alt: field.alt || "",
  };
}

export function remapSliceImages(slices) {
  if (!Array.isArray(slices)) return slices;
  return slices.map((slice) => {
    const next = {
      ...slice,
      primary: { ...(slice.primary || {}) },
      items: [...(slice.items || [])],
    };
    for (const [k, v] of Object.entries(next.primary)) {
      if (v && typeof v === "object" && v.url) {
        const r = resolveImage(v);
        next.primary[k] = { ...v, url: r.displaySrc, prismicSrc: r.prismicSrc };
      }
      if (Array.isArray(v)) {
        next.primary[k] = v.map((row) => {
          if (!row || typeof row !== "object") return row;
          const copy = { ...row };
          for (const [rk, rv] of Object.entries(copy)) {
            if (rv && typeof rv === "object" && rv.url) {
              const r = resolveImage(rv);
              copy[rk] = { ...rv, url: r.displaySrc, prismicSrc: r.prismicSrc };
            }
          }
          return copy;
        });
      }
    }
    next.items = next.items.map((item) => {
      if (!item || typeof item !== "object") return item;
      const copy = { ...item };
      for (const [ik, iv] of Object.entries(copy)) {
        if (iv && typeof iv === "object" && iv.url) {
          const r = resolveImage(iv);
          copy[ik] = { ...iv, url: r.displaySrc, prismicSrc: r.prismicSrc };
        }
      }
      return copy;
    });
    return next;
  });
}
