import { describe, test, expect } from "vitest";

describe("<CustomHits />", () => {
  test("component file exists and exports default", async () => {
    const module = await import("./CustomHits");
    expect(module.default).toBeDefined();
  });
});
