import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import BlogArticlesList from "./BlogArticlesList";
import { mockBlogPost } from "../../test-utils";

// Mock child components
vi.mock("./BlogArticleItem", () => ({
  default: ({ title }: any) => <div data-testid="blog-article">{title}</div>,
}));

vi.mock("../pagination/Pagination", () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("<BlogArticlesList />", () => {
  const mockArticles = [
    mockBlogPost({ id: 1, title: "Article 1" }),
    mockBlogPost({ id: 2, title: "Article 2" }),
    mockBlogPost({ id: 3, title: "Article 3" }),
    mockBlogPost({ id: 4, title: "Article 4" }),
  ];

  test("renders blog articles", () => {
    const setCurrentPage = vi.fn();
    renderWithChakra(
      <BlogArticlesList
        articles={mockArticles}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />
    );

    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
    expect(screen.getByText("Article 3")).toBeInTheDocument();
  });

  test("renders pagination component", () => {
    const setCurrentPage = vi.fn();
    renderWithChakra(
      <BlogArticlesList
        articles={mockArticles}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("renders with empty articles array", () => {
    const setCurrentPage = vi.fn();
    const { container } = renderWithChakra(
      <BlogArticlesList
        articles={[]}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
