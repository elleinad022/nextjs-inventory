import Link from "next/link";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center bg-linear-to-bl/oklch from-neutral-800 to-zinc-900">
      <section className="w-full max-w-3xl space-y-3">
        <Badge variant="outline" className="w-fit">
          NextJS • TypeScript • Tailwind CSS • PostgreSQL{" "}
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Inventory Management System
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your inventory with ease and efficiency. Track Products,
          monitor stock levels, and generate insightful reports to optimize your
          business operations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/auth/sign-in"
            className="bg-primary rounded-sm inline-flex items-center justify-center px-8 py-4 text-md font-medium text-primary-foreground hover:bg-primary/80">
            Sign In
          </Link>
          <Link
            href="/learn-more"
            className="bg-accent rounded-sm inline-flex items-center justify-center px-8 py-4 text-md font-medium text-accent-foreground hover:bg-accent/80">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
