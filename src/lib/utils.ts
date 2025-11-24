import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformOptionalFieldValue = (value: string | undefined): string | undefined => {
  return value && value.length > 0 ? value : undefined;
};
