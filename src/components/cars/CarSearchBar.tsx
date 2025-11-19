"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { objectToSearchParams } from "@/lib/utils/queryUtils";

export function CarSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = Object.fromEntries(searchParams.entries());
    const query = objectToSearchParams({ ...params, q: value || undefined });
    router.push(query ? `/inventory?${query}` : "/inventory");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search make, model or keywords"
          className="h-12 rounded-full border-primary/20 bg-background/80 pl-12"
        />
      </div>
    </form>
  );
}
