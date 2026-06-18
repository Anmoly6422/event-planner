export const dynamic = "force-dynamic";

import { AuthView } from "@neondatabase/auth-ui";

export default function AuthPage({ params }: { params: { path: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <AuthView path={params.path} />
    </main>
  );
}