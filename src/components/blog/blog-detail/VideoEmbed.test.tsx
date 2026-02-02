import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import VideoEmbed from "./VideoEmbed";

describe("<VideoEmbed />", () => {
  test("renders iframe when source is provided", () => {
    const { container } = render(
      <VideoEmbed source="https://odysee.com/test-video:1" />
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
  });

  test("returns null when source is empty", () => {
    const { container } = render(<VideoEmbed source="" />);
    expect(container.firstChild).toBeNull();
  });

  test("extracts video path correctly from odysee URL", () => {
    const { container} = render(
      <VideoEmbed source="https://odysee.com/beauty-tutorial:abc123" />
    );
    const iframe = container.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("beauty-tutorial:abc123");
  });

  test("sets correct iframe attributes", () => {
    const { container } = render(
      <VideoEmbed source="https://odysee.com/test:1" />
    );
    const iframe = container.querySelector("iframe");
    expect(iframe?.getAttribute("allowFullScreen")).toBe("");
    expect(iframe?.getAttribute("title")).toBe("Embedded video");
    expect(iframe?.getAttribute("width")).toBe("853");
    expect(iframe?.getAttribute("height")).toBe("480");
  });

  test("uses correct odysee embed URL format", () => {
    const { container } = render(
      <VideoEmbed source="https://odysee.com/my-video:123" />
    );
    const iframe = container.querySelector("iframe");
    // Note: $ is URL-encoded to %24 in the actual attribute
    expect(iframe?.getAttribute("src")).toContain("/embed/my-video:123");
  });

  test("handles https URLs", () => {
    const { container } = render(
      <VideoEmbed source="https://odysee.com/test-video:abc" />
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe?.getAttribute("src")).toContain("test-video:abc");
  });

  test("renders video wrapper div", () => {
    const { container } = render(
      <VideoEmbed source="https://odysee.com/test:1" />
    );
    const wrapper = container.querySelector("div");
    expect(wrapper).toBeInTheDocument();
  });
});
