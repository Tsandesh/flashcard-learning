import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeString(str: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}
