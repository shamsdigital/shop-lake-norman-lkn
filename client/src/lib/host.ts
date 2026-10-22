const apiOrigin = (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/$/, "") ?? "";

/**
 * Local dev talks to the Express server on the same origin.
 * A production static host (Cloudflare Pages) only calls an API when VITE_API_URL is set at build time.
 */
export const apiEnabled = import.meta.env.DEV || apiOrigin.length > 0;

export const trpcUrl = apiOrigin ? `${apiOrigin}/api/trpc` : "/api/trpc";
