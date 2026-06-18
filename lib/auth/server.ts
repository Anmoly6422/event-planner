import { createNeonAuth } from "@neondatabase/auth/next/server";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

/**
 * Safe session getter
 */
export async function getSession() {
  try {
    return await auth.getSession();
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}