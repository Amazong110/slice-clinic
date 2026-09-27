import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "slice-clinic";

const routes = [
  {
    type: "home_page",
    path: "/",
  },
  {
    type: "secondpage",
    path: "/:uid",
  },
  {
    type: "thanks_page",
    path: "/thank-you",
  },
];

function isDraftModeEnabled() {
  try {
    // Dynamic require so importing `repositoryName` (e.g. root layout) does NOT
    // pull in next/headers and force the whole tree dynamic.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { draftMode } = require("next/headers");
    const mode = draftMode();
    if (mode && typeof mode.then === "function") {
      // Next 15+ async draftMode — cannot await in sync createClient;
      // enableAutoPreviews still supplies the preview ref.
      return false;
    }
    return Boolean(mode?.isEnabled);
  } catch {
    return false;
  }
}

/**
 * Shared Prismic client.
 *
 * Caching (App Router / Vercel):
 * - Production (published): tag `prismic` + ISR fallback (`revalidate: 60`).
 *   Webhook should still hit `/api/revalidate` for instant updates.
 * - Draft Mode / preview: `no-store` so editors always see unpublished content.
 * - Development: short ISR (`revalidate: 5`).
 */
export const createClient = (config = {}) => {
  const accessToken = config.accessToken ?? process.env.PRISMIC_ACCESS_TOKEN;
  const isProd = process.env.NODE_ENV === "production";
  const isDraft = isDraftModeEnabled();

  const defaultFetchOptions = isDraft
    ? { cache: "no-store" }
    : isProd
      ? { next: { tags: ["prismic"], revalidate: 60 } }
      : { next: { revalidate: 5 } };

  // Empty remote repos (types: {}) reject route declarations with
  // "Link resolver error / Unknown type". Disable until models are pushed.
  const activeRoutes =
    process.env.PRISMIC_DISABLE_ROUTES === "1" ? [] : routes;

  const client = prismic.createClient(repositoryName, {
    routes: activeRoutes,
    ...(accessToken ? { accessToken } : {}),
    ...config,
    fetchOptions: {
      ...defaultFetchOptions,
      ...config.fetchOptions,
      next: {
        ...defaultFetchOptions.next,
        ...config.fetchOptions?.next,
      },
    },
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
