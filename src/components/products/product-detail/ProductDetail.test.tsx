import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderWithChakra, mockProduct } from "../../../test-utils";
import ProductDetail from "./ProductDetail";

// Mock Next.js components
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown> & { alt?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={String(props.alt || "")} />;
  },
}));

// Mock ReactMarkdown
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <div>{children}</div>,
}));

describe("<ProductDetail />", () => {
  const mockProductData = mockProduct({
    name: "Test Product",
    intro: "Test intro",
    description: "Test description with link https://example.com",
    price: 99.99,
    categories: ["Skincare", "Beauty"],
  });

  const mockPrevNextProducts = [
    {
      id: 1,
      documentId: "prev-product",
      title: "Previous Product",
      imageUrl: "/prev.jpg",
    },
    {
      id: 2,
      documentId: "next-product",
      title: "Next Product",
      imageUrl: "/next.jpg",
    },
  ];

  const mockRecommendedProducts = [
    {
      id: 1,
      documentId: "rec-1",
      Name: "Recommended Product 1",
      Intro: "Test intro 1",
      Price: 49.99,
      Description: "Test description 1",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      publishedAt: "2024-01-01",
      Image: {
        id: 1,
        documentId: "img-1",
        name: "rec1.jpg",
        url: "/rec1.jpg",
        alternativeText: null,
        caption: null,
        width: 300,
        height: 300,
        formats: {
          small: {
            ext: ".jpg",
            url: "/small.jpg",
            hash: "hash",
            mime: "image/jpeg",
            name: "small",
            path: null,
            size: 10,
            width: 100,
            height: 100,
            provider_metadata: {},
          },
          thumbnail: {
            ext: ".jpg",
            url: "/thumb.jpg",
            hash: "hash",
            mime: "image/jpeg",
            name: "thumb",
            path: null,
            size: 5,
            width: 50,
            height: 50,
            provider_metadata: {},
          },
        },
        hash: "test",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 100,
        previewUrl: null,
        provider: "local",
        provider_metadata: {},
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        publishedAt: "2024-01-01",
      },
      item_categories: [],
    },
    {
      id: 2,
      documentId: "rec-2",
      Name: "Recommended Product 2",
      Intro: "Test intro 2",
      Price: 59.99,
      Description: "Test description 2",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      publishedAt: "2024-01-01",
      Image: {
        id: 2,
        documentId: "img-2",
        name: "rec2.jpg",
        url: "/rec2.jpg",
        alternativeText: null,
        caption: null,
        width: 300,
        height: 300,
        formats: {
          small: {
            ext: ".jpg",
            url: "/small.jpg",
            hash: "hash",
            mime: "image/jpeg",
            name: "small",
            path: null,
            size: 10,
            width: 100,
            height: 100,
            provider_metadata: {},
          },
          thumbnail: {
            ext: ".jpg",
            url: "/thumb.jpg",
            hash: "hash",
            mime: "image/jpeg",
            name: "thumb",
            path: null,
            size: 5,
            width: 50,
            height: 50,
            provider_metadata: {},
          },
        },
        hash: "test",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 100,
        previewUrl: null,
        provider: "local",
        provider_metadata: {},
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        publishedAt: "2024-01-01",
      },
      item_categories: [],
    },
    {
      id: 3,
      documentId: "rec-3",
      Name: "Recommended Product 3",
      Intro: "Test intro 3",
      Price: 69.99,
      Description: "Test description 3",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      publishedAt: "2024-01-01",
      Image: {
        id: 3,
        documentId: "img-3",
        name: "rec3.jpg",
        url: "/rec3.jpg",
        alternativeText: null,
        caption: null,
        width: 300,
        height: 300,
        formats: {
          small: {
            ext: ".jpg",
            url: "/small.jpg",
            hash: "hash",
            mime: "image/jpeg",
            name: "small",
            path: null,
            size: 10,
            width: 100,
            height: 100,
            provider_metadata: {},
          },
          thumbnail: {
            ext: ".jpg",
            url: "/thumb.jpg",
            hash: "hash",
            mime: "image/jpeg",
            name: "thumb",
            path: null,
            size: 5,
            width: 50,
            height: 50,
            provider_metadata: {},
          },
        },
        hash: "test",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 100,
        previewUrl: null,
        provider: "local",
        provider_metadata: {},
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        publishedAt: "2024-01-01",
      },
      item_categories: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders product name", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("test product")).toBeInTheDocument();
  });

  test("renders product image", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    const img = screen.getByAltText("Test Product");
    expect(img).toBeInTheDocument();
  });

  test("renders product price in correct format", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("99,99€")).toBeInTheDocument();
  });

  test("renders product intro", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("Test intro")).toBeInTheDocument();
  });

  test("renders product categories", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("Categories:")).toBeInTheDocument();
    expect(screen.getByText("Skincare")).toBeInTheDocument();
    expect(screen.getByText("Beauty")).toBeInTheDocument();
  });

  test("renders ACHETER button", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("ACHETER")).toBeInTheDocument();
  });

  test("renders description section", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  test("renders product description", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(
      screen.getByText("Test description with link https://example.com"),
    ).toBeInTheDocument();
  });

  test("renders Produits associés section", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("Produits associés")).toBeInTheDocument();
  });

  test("renders recommended products", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("Recommended Product 1")).toBeInTheDocument();
    expect(screen.getByText("Recommended Product 2")).toBeInTheDocument();
    expect(screen.getByText("Recommended Product 3")).toBeInTheDocument();
  });

  test("renders recommended product prices", () => {
    renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("49,99€")).toBeInTheDocument();
    expect(screen.getByText("59,99€")).toBeInTheDocument();
    expect(screen.getByText("69,99€")).toBeInTheDocument();
  });

  test("renders navigation controls", () => {
    const { container } = renderWithChakra(
      <ProductDetail
        product={mockProductData}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    const navLinks = container.querySelectorAll("a");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test("formats price without decimal correctly", () => {
    const productWithoutDecimal = mockProduct({ price: 50 });
    renderWithChakra(
      <ProductDetail
        product={productWithoutDecimal}
        prevNextProducts={mockPrevNextProducts}
        recommendedProducts={mockRecommendedProducts}
      />,
    );
    expect(screen.getByText("50,00€")).toBeInTheDocument();
  });
});
