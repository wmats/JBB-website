import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ProductItem from "./ProductItem";
import { mockProduct } from "../../test-utils";

// Mock Next.js components
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

describe("<ProductItem />", () => {
  const defaultProduct = mockProduct();

  test("renders product name", () => {
    render(<ProductItem idx={0} product={defaultProduct} />);
    expect(screen.getByText(defaultProduct.name)).toBeInTheDocument();
  });

  test("renders product image", () => {
    render(<ProductItem idx={0} product={defaultProduct} />);
    const img = screen.getByAltText(defaultProduct.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", defaultProduct.imageUrl);
  });

  test("formats price correctly without decimal", () => {
    const product = mockProduct({ price: 50 });
    render(<ProductItem idx={0} product={product} />);
    expect(screen.getByText("50,00€")).toBeInTheDocument();
  });

  test("formats price correctly with one decimal", () => {
    const product = mockProduct({ price: 49.9 });
    render(<ProductItem idx={0} product={product} />);
    expect(screen.getByText("49,90€")).toBeInTheDocument();
  });

  test("formats price correctly with two decimals", () => {
    const product = mockProduct({ price: 99.99 });
    render(<ProductItem idx={0} product={product} />);
    expect(screen.getByText("99,99€")).toBeInTheDocument();
  });

  test("renders link to product detail page", () => {
    render(<ProductItem idx={0} product={defaultProduct} />);
    const links = screen.getAllByRole("link");
    const productLink = links.find(
      (link) => link.getAttribute("href") === `/products/${defaultProduct.documentId}`
    );
    expect(productLink).toBeInTheDocument();
  });

  test("renders product container", () => {
    const { container } = render(<ProductItem idx={5} product={defaultProduct} />);
    const productDiv = container.querySelector("div");
    expect(productDiv).toBeInTheDocument();
  });

  test("renders image with correct dimensions", () => {
    render(<ProductItem idx={0} product={defaultProduct} />);
    const img = screen.getByAltText(defaultProduct.name);
    expect(img).toHaveAttribute("width", "300");
    expect(img).toHaveAttribute("height", "300");
  });

  test("handles price with zero cents", () => {
    const product = mockProduct({ price: 100.0 });
    render(<ProductItem idx={0} product={product} />);
    expect(screen.getByText("100,00€")).toBeInTheDocument();
  });
});
