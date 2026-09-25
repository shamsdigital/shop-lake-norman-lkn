import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { createBusinessCard, listBusinessCards } from "./db";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";
import * as cookie from "cookie";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";

const ADMIN_COOKIE = "lkn_admin_session";
const sessionSecret = new TextEncoder().encode(ENV.cookieSecret || "development-admin-secret");

async function makeAdminToken() {
  return new SignJWT({ scope: "lkn-admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("2h").sign(sessionSecret);
}

async function hasAdminSession(req: { headers: { cookie?: string } }) {
  const token = cookie.parse(req.headers.cookie ?? "")[ADMIN_COOKIE];
  if (!token) return false;
  try { const { payload } = await jwtVerify(token, sessionSecret); return payload.scope === "lkn-admin"; }
  catch { return false; }
}

const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!(await hasAdminSession(ctx.req))) throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin session required" });
  return next();
});

const cardInput = z.object({
  category: z.string().trim().min(1).max(255),
  businessName: z.string().trim().min(1).max(255),
  businessUrl: z.string().trim().url().optional().or(z.literal("")),
  imageUrl: z.string().trim().optional(),
  imageDataUrl: z.string().trim().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  cards: router({ list: publicProcedure.query(() => listBusinessCards()) }),
  admin: router({
    verifyPassword: publicProcedure.input(z.object({ password: z.string().min(8).max(128) })).mutation(async ({ input, ctx }) => {
      if (!ENV.adminPassword || input.password !== ENV.adminPassword) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid admin password" });
      const token = await makeAdminToken();
      const secureFlag = ENV.isProduction ? "; Secure" : "";
      ctx.res.setHeader("Set-Cookie", `${ADMIN_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7200${secureFlag}`);
      return { ok: true } as const;
    }),
    session: publicProcedure.query(async ({ ctx }) => ({ ok: await hasAdminSession(ctx.req) })),
    list: adminProcedure.query(() => listBusinessCards()),
    createCard: adminProcedure.input(cardInput).mutation(async ({ input }) => {
      let imageUrl = input.imageUrl?.trim() ?? "";
      let imageKey: string | undefined;
      if (input.imageDataUrl) {
        const match = input.imageDataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
        if (!match) throw new TRPCError({ code: "BAD_REQUEST", message: "Image upload must be a base64 image data URL" });
        const [, contentType, base64] = match;
        const bytes = Buffer.from(base64, "base64");
        if (bytes.length > 4 * 1024 * 1024) throw new TRPCError({ code: "BAD_REQUEST", message: "Image must be 4 MB or smaller" });
        if (ENV.forgeApiUrl && ENV.forgeApiKey) {
          const extension = contentType.split("/")[1].replace("jpeg", "jpg");
          const stored = await storagePut(`business-cards/${Date.now()}-${input.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 48)}.${extension}`, bytes, contentType);
          imageUrl = stored.url;
          imageKey = stored.key;
        } else {
          imageUrl = input.imageDataUrl;
        }
      }
      if (!imageUrl) throw new TRPCError({ code: "BAD_REQUEST", message: "Add an image upload or image URL" });
      return createBusinessCard({ category: input.category, businessName: input.businessName, businessUrl: input.businessUrl || null, imageUrl, imageKey: imageKey ?? null });
    }),
  }),
});

export type AppRouter = typeof appRouter;
