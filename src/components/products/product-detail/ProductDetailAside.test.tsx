import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderWithChakra, mockBlogPost } from "../../../test-utils";
import ProductDetailAside from "./ProductDetailAside";

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

describe("<ProductDetailAside />", () => {
  const mockRelatedArticles = [
    mockBlogPost({
      id: 1,
      documentId: "article-1",
      title: "Related Article 1",
      issueDate: "2024-01-15",
    }),
    mockBlogPost({
      id: 2,
      documentId: "article-2",
      title: "Related Article 2",
      issueDate: "2024-02-10",
    }),
    mockBlogPost({
      id: 3,
      documentId: "article-3",
      title: "Related Article 3",
      issueDate: "2024-03-05",
    }),
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders Me suivre section", () => {
    renderWithChakra(<ProductDetailAside relatedArticles={mockRelatedArticles} />);
    expect(screen.getByText("Me suivre")).toBeInTheDocument();
  });

  test("renders social media icons", () => {
    const { container } = renderWithChakra(
      <ProductDetailAside relatedArticles={mockRelatedArticles} />
    );
    const socialLinks = container.querySelectorAll('a[target="_blank"]');
    expect(socialLinks.length).toBe(3); // Facebook, Instagram, Email
  });

  test("renders Facebook link", () => {
    const { container } = renderWithChakra(
      <ProductDetailAside relatedArticles={mockRelatedArticles} />
    );
    const facebookLink = container.querySelector(
      'a[href="https://www.facebook.com/groups/3136931483299677"]'
    );
    expect(facebookLink).toBeInTheDocument();
  });

  test("renders Instagram link", () => {
    const { container } = renderWithChakra(
      <ProductDetailAside relatedArticles={mockRelatedArticles} />
    );
    const instagramLink = container.querySelector(
      'a[href="https://www.instagram.com/julie_baronnie/"]'
    );
    expect(instagramLink).toBeInTheDocument();
  });

  test("renders email link", () => {
    const { container } = renderWithChakra(
      <ProductDetailAside relatedArticles={mockRelatedArticles} />
    );
    const emailLink = container.querySelector(
      'a[href="mailto:contact@juliebaronniebeauty.com"]'
    );
    expect(emailLink).toBeInTheDocument();
  });

  test("renders Articles recommandés section when articles are provided", () => {
    renderWithChakra(<ProductDetailAside relatedArticles={mockRelatedArticles} />);
    expect(screen.getByText("Articles recommandés")).toBeInTheDocument();
  });

  test("renders all related article titles", () => {
    renderWithChakra(<ProductDetailAside relatedArticles={mockRelatedArticles} />);
    expect(screen.getByText("Related Article 1")).toBeInTheDocument();
    expect(screen.getByText("Related Article 2")).toBeInTheDocument();
    expect(screen.getByText("Related Article 3")).toBeInTheDocument();
  });

  test("renders formatted dates", () => {
    renderWithChakra(<ProductDetailAside relatedArticles={mockRelatedArticles} />);
    expect(screen.getByText("15 Janvier 2024")).toBeInTheDocument();
    expect(screen.getByText("10 Février 2024")).toBeInTheDocument();
    expect(screen.getByText("5 Mars 2024")).toBeInTheDocument();
  });

  test("renders comment count for each article", () => {
    renderWithChakra(<ProductDetailAside relatedArticles={mockRelatedArticles} />);
    const commentsText = screen.getAllByText("0 Comments");
    expect(commentsText.length).toBe(3); // One for each article
  });

  test("renders article images", () => {
    renderWithChakra(<ProductDetailAside relatedArticles={mockRelatedArticles} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
  });

  test("does not render Articles recommandés section when no articles provided", () => {
    renderWithChakra(<ProductDetailAside relatedArticles={[]} />);
    expect(screen.queryByText("Articles recommandés")).not.toBeInTheDocument();
  });

  test("renders links to article detail pages", () => {
    const { container } = renderWithChakra(
      <ProductDetailAside relatedArticles={mockRelatedArticles} />
    );
    const articleLinks = container.querySelectorAll('a[href*="/blog/"]');
    expect(articleLinks.length).toBeGreaterThan(0);
  });

  test("renders aside element", () => {
    const { container } = renderWithChakra(
      <ProductDetailAside relatedArticles={mockRelatedArticles} />
    );
    const aside = container.querySelector("aside");
    expect(aside).toBeInTheDocument();
  });
});
