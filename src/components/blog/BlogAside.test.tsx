import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderWithChakra, mockBlogPost } from "../../test-utils";
import BlogAside from "./BlogAside";

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

describe("<BlogAside />", () => {
  const mockArticles = [
    mockBlogPost({ id: 1, title: "Article 1" }),
    mockBlogPost({ id: 2, title: "Article 2" }),
    mockBlogPost({ id: 3, title: "Article 3" }),
  ];

  const mockActiveCategories = {
    Beauty: 5,
    Skincare: 3,
    Tips: 2,
  };

  const mockSetSelectedCategory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders Me suivre section", () => {
    renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    expect(screen.getByText("Me suivre")).toBeInTheDocument();
  });

  test("renders social media icons", () => {
    const { container } = renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    const socialLinks = container.querySelectorAll('a[target="_blank"]');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  test("renders categories section", () => {
    renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    expect(screen.getByText("Catégories")).toBeInTheDocument();
  });

  test("renders all categories with counts", () => {
    const { container } = renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    expect(screen.getByText("Beauty")).toBeInTheDocument();
    expect(container.textContent).toContain("(5)");
    expect(screen.getByText("Skincare")).toBeInTheDocument();
    expect(container.textContent).toContain("(3)");
  });

  test("renders Toutes catégories option", () => {
    const { container } = renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    expect(screen.getByText("Toutes catégories")).toBeInTheDocument();
    expect(container.textContent).toContain("(3)"); // Total articles count
  });

  test("renders recent articles section", () => {
    renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    expect(screen.getByText("Articles récents")).toBeInTheDocument();
  });

  test("renders recent article titles", () => {
    renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
    expect(screen.getByText("Article 3")).toBeInTheDocument();
  });

  test("calls setSelectedCategory when category is clicked", () => {
    renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    const beautyCategory = screen.getByText("Beauty");
    fireEvent.click(beautyCategory);
    expect(mockSetSelectedCategory).toHaveBeenCalledWith("Beauty");
  });

  test("renders article images", () => {
    renderWithChakra(
      <BlogAside
        articles={mockArticles}
        activeCategories={mockActiveCategories}
        setSelectedCategory={mockSetSelectedCategory}
      />,
    );
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3); // Three recent articles
  });
});
