import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../test-utils";
import LoginHeading from "./LoginHeading";

describe("<LoginHeading />", () => {
  test("renders main heading", () => {
    renderWithChakra(<LoginHeading />);
    expect(screen.getByText("Mon compte")).toBeInTheDocument();
  });

  test("renders breadcrumb navigation", () => {
    renderWithChakra(<LoginHeading />);
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
  });

  test("renders home icon link", () => {
    renderWithChakra(<LoginHeading />);
    const homeLink = screen.getByRole("link", { name: "" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders as header element", () => {
    const { container } = renderWithChakra(<LoginHeading />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});
