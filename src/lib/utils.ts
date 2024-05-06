import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cookieParser(cookieHeader: string) {
  return Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );
}
