/**
 * Format date to locale string
 *
 * @param date Date to format
 * @param locale Locale to use for formatting
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: string = "ja-JP"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncate text to a specified length
 *
 * @param text Text to truncate
 * @param length Maximum length
 * @param suffix Suffix to add when truncated
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  length: number = 100,
  suffix: string = "..."
): string {
  if (text.length <= length) {
    return text;
  }

  return text.substring(0, length).trim() + suffix;
}

/**
 * Generate a random ID
 *
 * @param prefix Prefix for the ID
 * @returns Random ID string
 */
export function generateId(prefix: string = "id"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Check if a URL is external
 *
 * @param url URL to check
 * @returns True if the URL is external
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;

  // If it starts with http:// or https:// and doesn't contain the current domain
  return (
    /^(https?:)?\/\//.test(url) &&
    !url.includes(typeof window !== "undefined" ? window.location.hostname : "")
  );
}

/**
 * Debounce a function
 *
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle a function
 *
 * @param func Function to throttle
 * @param limit Limit time in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 300
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
