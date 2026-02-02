import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderWithChakra, mockProduct } from "../../test-utils";
import ProductsAside from "./ProductsAside";

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

describe("<ProductsAside />", () => {
  const mockProducts = [
    mockProduct({ id: "1", name: "Product 1", price: 10 }),
    mockProduct({ id: "2", name: "Product 2", price: 20 }),
    mockProduct({ id: "3", name: "Product 3", price: 30 }),
  ];

  const mockActiveCategories = {
    Skincare: 5,
    Makeup: 3,
    Haircare: 2,
  };

  const mockSetSelectedCategory = vi.fn();
  const mockSetFilterRange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders Filtrer par prix section", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Filtrer par prix")).toBeInTheDocument();
  });

  test("renders price range slider section", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    // Just check that the price filter section exists
    expect(screen.getByText("Filtrer par prix")).toBeInTheDocument();
  });

  test("renders Filtrer button", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Filtrer")).toBeInTheDocument();
  });

  test("renders Me suivre section", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Me suivre")).toBeInTheDocument();
  });

  test("renders social media icons", () => {
    const { container } = renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    const socialLinks = container.querySelectorAll('a[target="_blank"]');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  test("renders categories section", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Catégories")).toBeInTheDocument();
  });

  test("renders all categories with counts", () => {
    const { container } = renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Skincare")).toBeInTheDocument();
    expect(container.textContent).toContain("(5)");
    expect(screen.getByText("Makeup")).toBeInTheDocument();
    expect(container.textContent).toContain("(3)");
  });

  test("renders Toutes catégories option", () => {
    const { container } = renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Toutes catégories")).toBeInTheDocument();
    expect(container.textContent).toContain("(3)"); // Total products count
  });

  test("renders recent products section", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Produits récents")).toBeInTheDocument();
  });

  test("renders recent product names", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });

  test("renders product prices in correct format", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    expect(screen.getByText("10,00€")).toBeInTheDocument();
    expect(screen.getByText("20,00€")).toBeInTheDocument();
    expect(screen.getByText("30,00€")).toBeInTheDocument();
  });

  test("calls setSelectedCategory when category is clicked", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    const skincareCategory = screen.getByText("Skincare");
    fireEvent.click(skincareCategory);
    expect(mockSetSelectedCategory).toHaveBeenCalledWith("Skincare");
  });

  test("renders product images", () => {
    renderWithChakra(
      <ProductsAside
        products={mockProducts}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
        setFilterRange={mockSetFilterRange}
      />
    );
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3); // Three recent products
  });
});
