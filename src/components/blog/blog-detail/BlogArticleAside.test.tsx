import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderWithChakra } from "../../../test-utils";
import BlogArticleAside from "./BlogArticleAside";

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

describe("<BlogArticleAside />", () => {
  const mockArticles = [
    {
      id: 1,
      documentId: "article-1",
      title: "Article 1",
      issueDate: "2024-01-15",
      imageUrl: "/article1.jpg",
    },
    {
      id: 2,
      documentId: "article-2",
      title: "Article 2",
      issueDate: "2024-02-10",
      imageUrl: "/article2.jpg",
    },
    {
      id: 3,
      documentId: "article-3",
      title: "Article 3",
      issueDate: "2024-03-05",
      imageUrl: "/article3.jpg",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders Me suivre section", () => {
    renderWithChakra(<BlogArticleAside articles={mockArticles} />);
    expect(screen.getByText("Me suivre")).toBeInTheDocument();
  });

  test("renders social media icons", () => {
    const { container } = renderWithChakra(
      <BlogArticleAside articles={mockArticles} />,
    );
    const socialLinks = container.querySelectorAll('a[target="_blank"]');
    expect(socialLinks.length).toBe(3); // Facebook, Instagram, Email
  });

  test("renders Facebook link", () => {
    const { container } = renderWithChakra(
      <BlogArticleAside articles={mockArticles} />,
    );
    const facebookLink = container.querySelector(
      'a[href="https://www.facebook.com/groups/3136931483299677"]',
    );
    expect(facebookLink).toBeInTheDocument();
  });

  test("renders Instagram link", () => {
    const { container } = renderWithChakra(
      <BlogArticleAside articles={mockArticles} />,
    );
    const instagramLink = container.querySelector(
      'a[href="https://www.instagram.com/julie_baronnie/"]',
    );
    expect(instagramLink).toBeInTheDocument();
  });

  test("renders email link", () => {
    const { container } = renderWithChakra(
      <BlogArticleAside articles={mockArticles} />,
    );
    const emailLink = container.querySelector(
      'a[href="mailto:contact@juliebaronniebeauty.com"]',
    );
    expect(emailLink).toBeInTheDocument();
  });

  test("renders Articles récents section", () => {
    renderWithChakra(<BlogArticleAside articles={mockArticles} />);
    expect(screen.getByText("Articles récents")).toBeInTheDocument();
  });

  test("renders all article titles", () => {
    renderWithChakra(<BlogArticleAside articles={mockArticles} />);
    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
    expect(screen.getByText("Article 3")).toBeInTheDocument();
  });

  test("renders formatted dates", () => {
    renderWithChakra(<BlogArticleAside articles={mockArticles} />);
    expect(screen.getByText("15 Janvier 2024")).toBeInTheDocument();
    expect(screen.getByText("10 Février 2024")).toBeInTheDocument();
    expect(screen.getByText("5 Mars 2024")).toBeInTheDocument();
  });

  test("renders comment count for each article", () => {
    renderWithChakra(<BlogArticleAside articles={mockArticles} />);
    const commentsText = screen.getAllByText("0 Comments");
    expect(commentsText.length).toBe(3); // One for each article
  });

  test("renders article images", () => {
    renderWithChakra(<BlogArticleAside articles={mockArticles} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
    expect(images[0]).toHaveAttribute("alt", "Article 1");
    expect(images[1]).toHaveAttribute("alt", "Article 2");
    expect(images[2]).toHaveAttribute("alt", "Article 3");
  });

  test("renders links to article detail pages", () => {
    const { container } = renderWithChakra(
      <BlogArticleAside articles={mockArticles} />,
    );
    const articleLinks = container.querySelectorAll('a[href*="/blog/"]');
    expect(articleLinks.length).toBeGreaterThan(0);
  });

  test("renders aside element", () => {
    const { container } = renderWithChakra(
      <BlogArticleAside articles={mockArticles} />,
    );
    const aside = container.querySelector("aside");
    expect(aside).toBeInTheDocument();
  });
});
