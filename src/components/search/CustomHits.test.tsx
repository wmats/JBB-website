import { describe, test, expect } from "vitest";

describe("<CustomHits />", () => {
  test("component file exists and exports default", async () => {
    const customHitsModule = await import("./CustomHits");
    expect(customHitsModule.default).toBeDefined();
  });
});
