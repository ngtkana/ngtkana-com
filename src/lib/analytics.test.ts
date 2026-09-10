import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent, trackLinkClick, trackLinkIfVideo, trackVideoLinkClick } from "./analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  afterEach(() => {
    // @ts-expect-error -- reset test double
    delete window.gtag;
  });

  it("forwards events to gtag when available", () => {
    trackEvent("test_event", { foo: "bar" });
    expect(window.gtag).toHaveBeenCalledWith("event", "test_event", { foo: "bar" });
  });
});

describe("trackLinkClick", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  it("tracks a link_click event with the given params", () => {
    trackLinkClick("social", "YouTube", "https://youtube.com/@ngtkana");
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "link_click",
      expect.objectContaining({ link_type: "social", link_name: "YouTube" }),
    );
  });

  it("does not track when a required param is missing", () => {
    trackLinkClick("", "YouTube", "https://youtube.com/@ngtkana");
    expect(window.gtag).not.toHaveBeenCalled();
  });
});

describe("trackLinkIfVideo", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  it("tracks known video platforms and returns true", () => {
    const tracked = trackLinkIfVideo("YouTube", "@ngtkana", "https://youtube.com/@ngtkana");
    expect(tracked).toBe(true);
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "video_link_click",
      expect.objectContaining({ platform: "YouTube" }),
    );
  });

  it("ignores non-video platforms and returns false", () => {
    const tracked = trackLinkIfVideo("GitHub", "ngtkana", "https://github.com/ngtkana");
    expect(tracked).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();
  });
});

describe("trackVideoLinkClick", () => {
  it("does not track when a required param is missing", () => {
    window.gtag = vi.fn();
    trackVideoLinkClick("", "@ngtkana", "https://youtube.com/@ngtkana");
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
