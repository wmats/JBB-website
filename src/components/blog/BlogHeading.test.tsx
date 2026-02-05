import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../test-utils";
import BlogHeading from "./BlogHeading";

describe("<BlogHeading />", () => {
  test("renders Blog heading", () => {
    renderWithChakra(<BlogHeading />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  test("renders Articles breadcrumb", () => {
    renderWithChakra(<BlogHeading />);
    expect(screen.getByText("Articles")).toBeInTheDocument();
  });

  test("renders home link", () => {
    renderWithChakra(<BlogHeading />);
    const homeLink = screen.getByRole("link", { name: "" });
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
