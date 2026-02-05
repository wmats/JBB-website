import { describe, test, expect, vi } from "vitest";
import { renderWithChakra, mockProduct, mockBlogPost } from "../../test-utils";
import HomeComponent from "./HomeComponent";
import { screen } from "@testing-library/react";

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

vi.mock("next/head", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock ProductItem component
vi.mock("../products/ProductItem", () => ({
  default: ({ product }: { product: { name: string } }) => (
    <div data-testid="product-item">{product.name}</div>
  ),
}));

// Mock Chakra UI useMediaQuery
vi.mock("@chakra-ui/react", async () => {
  const actual = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    useMediaQuery: () => [false, false], // Default to mobile view
  };
});

describe("<HomeComponent />", () => {
  const mockProducts = [
    mockProduct({ id: "1", name: "Product 1" }),
    mockProduct({ id: "2", name: "Product 2" }),
  ];

  const mockArticles = [
    mockBlogPost({ id: 1, title: "Article 1" }),
    mockBlogPost({ id: 2, title: "Article 2" }),
  ];

  test("renders main heading", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    expect(screen.getByText("Julie Baronnie Beauty")).toBeInTheDocument();
  });

  test("renders hero section with description", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    expect(
      screen.getByText(/Fils tenseurs, injections AH, mésothérapie/i),
    ).toBeInTheDocument();
  });

  test("renders recent products section heading", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    expect(screen.getByText("Produits récents")).toBeInTheDocument();
  });

  test("renders recent articles section heading", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    expect(screen.getByText("Articles récents")).toBeInTheDocument();
  });

  test("renders product items", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("renders article items", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
  });

  test("renders article images", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  test("renders links to article detail pages", () => {
    const article = mockBlogPost({
      id: 1,
      title: "Test Article",
      documentId: "test-doc",
    });
    renderWithChakra(
      <HomeComponent recentProducts={[]} recentArticles={[article]} />,
    );
    const links = screen.getAllByRole("link");
    const articleLinks = links.filter((link) =>
      link.getAttribute("href")?.includes("/blog/"),
    );
    expect(articleLinks.length).toBeGreaterThan(0);
  });

  test("truncates long article titles", () => {
    const longTitleArticle = mockBlogPost({
      id: 1,
      title:
        "This is a very long article title that should be truncated after 30 characters",
    });
    renderWithChakra(
      <HomeComponent recentProducts={[]} recentArticles={[longTitleArticle]} />,
    );
    expect(
      screen.getByText(/This is a very long article ti.../),
    ).toBeInTheDocument();
  });

  test("renders article descriptions", () => {
    const articleWithDesc = mockBlogPost({
      id: 1,
      title: "Article",
      description: "Test description",
    });
    renderWithChakra(
      <HomeComponent recentProducts={[]} recentArticles={[articleWithDesc]} />,
    );
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  test("handles empty products array", () => {
    renderWithChakra(
      <HomeComponent recentProducts={[]} recentArticles={mockArticles} />,
    );
    expect(screen.getByText("Produits récents")).toBeInTheDocument();
  });

  test("handles empty articles array", () => {
    renderWithChakra(
      <HomeComponent recentProducts={mockProducts} recentArticles={[]} />,
    );
    expect(screen.getByText("Articles récents")).toBeInTheDocument();
  });

  test("renders read overlay button on article images", () => {
    renderWithChakra(
      <HomeComponent
        recentProducts={mockProducts}
        recentArticles={mockArticles}
      />,
    );
    const readButtons = screen.getAllByText("Lire");
    expect(readButtons.length).toBe(mockArticles.length);
  });
});
