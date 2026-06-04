import { auth } from "@/lib/auth/server";
import { AuthView } from "@neondatabase/auth/react/ui";
import { authViewPaths } from "@neondatabase/auth/react/ui/server";
import Link from "next/link";
import AuthSignOutBtn from "@/components/auth-sign-out-btn";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  const { data: session } = await auth.getSession();

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-4 bg-page">
      <div className="mx-auto flex flex-col gap-2 min-w-sm max-w-md w-full items-center justify-center">
        {session ? (
          path === "sign-out" ? (
            <AuthView path={path} className="max-w-md" />
          ) : (
            <div className="flex flex-col gap-4">
              <h1 className="font-semibold text-primary-foreground text-3xl">
                You are already logged in as:{" "}
              </h1>
              <p className="text-xl tracking-tight text-center text-secondary-foreground">
                {session.user.name}
              </p>
              <Link
                href="/dashboard"
                className="bg-primary border border-border rounded-sm inline-flex items-center justify-center w-full py-2 text-md font-medium text-accent-foreground hover:bg-accent/80">
                Back to Dashboard
              </Link>
              <AuthSignOutBtn />
            </div>
          )
        ) : (
          <>
            <AuthView path={path} className="max-w-md" />
            <Link
              href="/"
              className="bg-muted border border-border rounded-sm inline-flex items-center justify-center w-full py-2 text-md font-medium text-accent-foreground hover:bg-accent/80">
              Back to Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
