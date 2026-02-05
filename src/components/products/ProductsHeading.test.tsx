import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../test-utils";
import ProductsHeading from "./ProductsHeading";

describe("<ProductsHeading />", () => {
  test("renders Produits heading", () => {
    renderWithChakra(<ProductsHeading />);
    expect(screen.getByText("Produits")).toBeInTheDocument();
  });

  test("renders Products breadcrumb", () => {
    renderWithChakra(<ProductsHeading />);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  test("renders home icon link", () => {
    renderWithChakra(<ProductsHeading />);
    const homeLink = screen.getByRole("link", { name: "" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders as header element", () => {
    const { container } = renderWithChakra(<ProductsHeading />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});
