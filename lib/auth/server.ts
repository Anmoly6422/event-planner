import { createNeonAuth } from "@neondatabase/auth/next/server";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || "http://localhost:3000",
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || "",
  },
});

/**
 * Safe session wrapper for Server Actions
 * prevents Next.js "unexpected response" crashes
 */
export async function getSession() {
  try {
    const session = await auth.getSession();
    console.log("RAW SESSION:", JSON.stringify(session, null, 2));
    return session ?? null;
  } catch (error) {
    console.error("❌ Neon Auth session error:", error);
    console.error("❌ Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    return null;
  }
}