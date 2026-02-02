import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../../test-utils";
import ProductDetailHeading from "./ProductDetailHeading";

describe("<ProductDetailHeading />", () => {
  test("renders product name in lowercase as heading", () => {
    renderWithChakra(<ProductDetailHeading name="Test Product" />);
    expect(screen.getByText("test product")).toBeInTheDocument();
  });

  test("renders product name in breadcrumb", () => {
    renderWithChakra(<ProductDetailHeading name="My Product" />);
    expect(screen.getByText("My Product")).toBeInTheDocument();
  });

  test("renders Produits breadcrumb link", () => {
    renderWithChakra(<ProductDetailHeading name="Test" />);
    expect(screen.getByText("Produits")).toBeInTheDocument();
  });

  test("renders home icon link", () => {
    renderWithChakra(<ProductDetailHeading name="Test" />);
    const links = screen.getAllByRole("link");
    const homeLink = links.find((link) => link.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });

  test("renders products breadcrumb link", () => {
    renderWithChakra(<ProductDetailHeading name="Test" />);
    const links = screen.getAllByRole("link");
    const productsLink = links.find(
      (link) => link.getAttribute("href") === "/products"
    );
    expect(productsLink).toBeInTheDocument();
  });

  test("converts name to lowercase for heading", () => {
    renderWithChakra(<ProductDetailHeading name="UPPERCASE NAME" />);
    expect(screen.getByText("uppercase name")).toBeInTheDocument();
  });
});
