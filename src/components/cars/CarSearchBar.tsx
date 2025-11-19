"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
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
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search make, model or keywords"
      />
    </form>
  );
}
