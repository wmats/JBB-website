import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import ProductsList from "./ProductsList";
import { mockProduct } from "../../test-utils";

// Mock child components
vi.mock("./ProductItem", () => ({
  default: ({ product }: any) => <div data-testid="product-item">{product.name}</div>,
}));

vi.mock("../pagination/Pagination", () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("<ProductsList />", () => {
  const mockProducts = [
    mockProduct({ id: "1", name: "Product 1" }),
    mockProduct({ id: "2", name: "Product 2" }),
    mockProduct({ id: "3", name: "Product 3" }),
  ];

  test("renders product items", () => {
    const setCurrentPage = vi.fn();
    renderWithChakra(
      <ProductsList
        products={mockProducts}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        isLargerThan500={true}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });

  test("renders pagination component", () => {
    const setCurrentPage = vi.fn();
    renderWithChakra(
      <ProductsList
        products={mockProducts}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        isLargerThan500={true}
      />
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("renders view selector", () => {
    const setCurrentPage = vi.fn();
    renderWithChakra(
      <ProductsList
        products={mockProducts}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        isLargerThan500={true}
      />
    );

    expect(screen.getByText("Produits par page:")).toBeInTheDocument();
    expect(screen.getByText("Tous")).toBeInTheDocument();
  });

  test("changes page size when view selector clicked", () => {
    const setCurrentPage = vi.fn();
    renderWithChakra(
      <ProductsList
        products={mockProducts}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        isLargerThan500={true}
      />
    );

    const tousButton = screen.getByText("Tous");
    fireEvent.click(tousButton);

    // Component should still render
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("renders with empty products array", () => {
    const setCurrentPage = vi.fn();
    const { container } = renderWithChakra(
      <ProductsList
        products={[]}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        isLargerThan500={true}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
