import { redirect } from "next/navigation";
import { auth } from "./auth/server";

export async function getUser() {
  const session = await auth.getSession();
  const user = session?.data?.user;
  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}
