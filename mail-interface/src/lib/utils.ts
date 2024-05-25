import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  value: string,
  formatType: "humanDate" | "datetime" | "normalDate" | "simple"
) {
  const date = new Date(value);
  const today = new Date();
  switch (formatType) {
    case "simple":
      return format(date, isToday(date) ? "p" : "Pp");
    case "humanDate":
      return formatDistanceToNow(date);
    case "datetime":
      return format(date, "yyyy-MM-dd HH:mm:ss");
    case "normalDate":
      return format(date, "E, h:m a");
    default:
      return format(date, "yyyy-MM-dd");
  }
}
