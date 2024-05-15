import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError, AxiosResponse } from "axios";
import { SuccessResponse } from "../interfaces/success-response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cookieParser(cookieHeader: string) {
  return Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );
}

export function checkSuccess(response: SuccessResponse) {
  if (!response || !response?.success) {
    const error = response as unknown as AxiosError;
    throw new Error(error?.message || "An error occurred during login");
  }
}

export function checkSuccessNextApi(response: AxiosResponse) {
  if (!response || !response?.data?.success) {
    const error = response as unknown as AxiosError;
    throw new Error(error?.message || "An error occurred during login");
  }
}

export function convertNullToEmptyString(value: string | null) {
  if (!value || value === "null") {
    return "";
  }
  return value;
}
