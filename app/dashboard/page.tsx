export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";
import { DashboardContent } from "@/components/dashboard-content";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.data?.user) {
   redirect("/auth/sign-in");
  }

  return <DashboardContent userId={session.data.user.id} />;
}