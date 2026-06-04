"use client";

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function AuthSignOutBtn() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/auth/sign-in");
    router.refresh();
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="secondary"
      size="lg"
      className="text-md w-full py-4">
      Logout
    </Button>
  );
}
