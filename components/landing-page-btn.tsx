"use client";

import { authClient } from "@/lib/auth/client";
import Link from "next/link";

export function PrimaryButton() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="bg-primary/50 animate-pulse rounded-sm inline-flex items-center justify-center px-8 py-4 text-md font-medium text-primary-foreground min-w-40">
        Loading...
      </div>
    );
  }
  return user ? (
    <Link
      href="/dashboard"
      className="bg-primary rounded-sm inline-flex items-center justify-center px-8 py-4 text-md font-medium text-primary-foreground hover:bg-primary/80">
      Go to Dashboard
    </Link>
  ) : (
    <Link
      href="/auth/sign-in"
      className="bg-primary rounded-sm inline-flex items-center justify-center px-8 py-4 text-md font-medium text-primary-foreground hover:bg-primary/80">
      Sign In
    </Link>
  );
}
