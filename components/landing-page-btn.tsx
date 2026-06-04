"use client";

import { authClient } from "@/lib/auth/client";
import Link from "next/link";

export function PrimaryButton() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

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
