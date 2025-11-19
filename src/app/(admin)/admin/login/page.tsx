import Link from "next/link";
import { AdminLoginForm } from "@/components/forms/AdminLoginForm";
import { buttonVariants } from "@/components/ui/button";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-lg">
        <p className="text-sm uppercase text-muted-foreground">Cars to go</p>
        <h1 className="text-3xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Use the credentials provisioned in the seed.</p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
        <Link href="/" className={`${buttonVariants({ variant: "link" })} mt-4 w-full justify-center`}>
          Back to site
        </Link>
      </div>
    </div>
  );
}
