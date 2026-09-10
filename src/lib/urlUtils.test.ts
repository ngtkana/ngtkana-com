import { describe, expect, it } from "vitest";
import { isValidUrl, sanitizeUrl } from "./urlUtils";

describe("isValidUrl", () => {
  it("accepts http(s) URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com")).toBe(true);
  });

  it("rejects non-http(s) protocols", () => {
    expect(isValidUrl("javascript:alert(1)")).toBe(false);
    expect(isValidUrl("ftp://example.com")).toBe(false);
  });

  it("rejects malformed URLs", () => {
    expect(isValidUrl("not a url")).toBe(false);
  });
});

describe("sanitizeUrl", () => {
  it("returns the normalized URL for valid input", () => {
    expect(sanitizeUrl("https://example.com")).toBe("https://example.com/");
  });

  it("returns null for invalid input", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBeNull();
    expect(sanitizeUrl("not a url")).toBeNull();
  });
});
