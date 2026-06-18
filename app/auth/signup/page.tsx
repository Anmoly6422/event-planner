import { AuthView } from "@neondatabase/auth-ui";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <AuthView path="signup" />
    </main>
  );
}