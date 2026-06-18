import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  // DO NOT handle auth here
  // Just pass request through safely

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};