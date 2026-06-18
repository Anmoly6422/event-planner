import { createNeonAuth } from "@neondatabase/auth/next/server";

const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

export const runtime = "edge";

export async function GET() {
  return await auth.handler();
}

export async function POST() {
  return await auth.handler();
}