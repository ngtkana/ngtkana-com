/**
 * URL validation and sanitization utilities
 */

/**
 * Validates if a string is a valid URL
 *
 * @param url The URL to validate
 * @returns true if the URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Sanitizes a URL to prevent common injection attacks
 *
 * @param url The URL to sanitize
 * @returns The sanitized URL or null if the URL is invalid
 */
export const sanitizeUrl = (url: string): string | null => {
  if (!isValidUrl(url)) {
    return null;
  }

  try {
    const urlObj = new URL(url);

    if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
      return null;
    }

    return urlObj.toString();
  } catch {
    return null;
  }
};
