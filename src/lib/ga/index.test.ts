import { describe, test, expect, beforeEach, vi } from "vitest";
import * as ga from "./index";

describe("Google Analytics functions", () => {
  beforeEach(() => {
    // Mock window.gtag
    (window as any).gtag = vi.fn();
  });

  test("pageview sends correct data when gtag exists", () => {
    const mockGtag = vi.fn();
    (window as any).gtag = mockGtag;

    ga.pageview("/test-url");

    expect(mockGtag).toHaveBeenCalledWith(
      "config",
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
      {
        page_path: "/test-url",
      }
    );
  });

  test("event sends correct data when gtag exists", () => {
    const mockGtag = vi.fn();
    (window as any).gtag = mockGtag;

    ga.event({
      action: "test_action",
      params: {
        category: "test_category",
        label: "test_label",
        value: 123,
      },
    });

    expect(mockGtag).toHaveBeenCalledWith("event", "test_action", {
      category: "test_category",
      label: "test_label",
      value: 123,
    });
  });
});
