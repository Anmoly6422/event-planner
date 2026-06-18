import { AuthView } from "@neondatabase/auth-ui";
import { authViewPaths } from "@neondatabase/auth-ui/server";

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default function AuthPage({
  params,
}: {
  params: { path: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <AuthView path={params.path} />
    </main>
  );
}