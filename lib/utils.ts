import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ScrollSmoother } from "gsap/ScrollSmoother";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let globalSmoother: ScrollSmoother | null = null;

export const setGlobalSmoother = (smoother: ScrollSmoother | null) => {
  globalSmoother = smoother;
};

export const getGlobalSmoother = (): ScrollSmoother | null => {
  return globalSmoother;
};

// Utility functions for smooth scroll control
export const scrollTo = (
  target: number | string | Element,
  options: { offset?: number; duration?: number; easing?: string } = {}
) => {
  if (globalSmoother) {
    globalSmoother.scrollTo(target as any, options as any);
  }
};

export const scrollToTop = () => {
  if (globalSmoother) {
    globalSmoother.scrollTo(0);
  }
};

export const scrollToBottom = () => {
  if (globalSmoother) {
    globalSmoother.scrollTo("100%");
  }
};

/**
 * Format a date to a human-readable string
 * @param date - Date object, string, or timestamp
 * @param format - Format type: 'full', 'short', 'relative'
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  format: "full" | "short" | "relative" = "full"
): string {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  if (format === "relative") {
    return getRelativeTime(dateObj);
  }

  if (format === "short") {
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Full format: "January 1, 2024 at 12:00 PM"
  return (
    dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) +
    " at " +
    dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
}

/**
 * Get relative time string (e.g., "2 hours ago", "3 days ago")
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

/**
 * Format date and time separately
 */
export function formatDateTime(date: Date | string | number): {
  date: string;
  time: string;
} {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  return {
    date: dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
}
