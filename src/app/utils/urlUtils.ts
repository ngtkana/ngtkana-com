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
        // Try to create a URL object
        const urlObj = new URL(url);

        // Check if the protocol is http or https
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
        // If URL constructor throws, it's not a valid URL
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
    // First check if it's a valid URL
    if (!isValidUrl(url)) {
        return null;
    }

    try {
        const urlObj = new URL(url);

        // Only allow http and https protocols
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
            return null;
        }

        // Return the sanitized URL
        return urlObj.toString();
    } catch (e) {
        return null;
    }
};
