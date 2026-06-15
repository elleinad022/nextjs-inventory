"use client";

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";

export function AuthRefreshSync() {
  const [isPending, startTransition] = useTransition();
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const lastUserRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const currentUser = session?.user?.id;
    if (currentUser !== lastUserRef.current) {
      lastUserRef.current = currentUser;
      startTransition(() => {
        router.refresh();
      });
    }
  }, [session, router]);

  return null;
}
