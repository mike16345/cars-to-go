"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export function AdminHeader() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await fetch("/api/auth/logout", { method: "DELETE" });
    window.location.href = "/";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <div>
        <p className="text-sm text-muted-foreground">Cars to go</p>
        <h1 className="text-xl font-semibold">Admin Portal</h1>
      </div>
      <Button onClick={handleLogout} variant="outline" disabled={isLoading}>
        {isLoading ? "Signing out..." : "Sign out"}
      </Button>
    </header>
  );
}
