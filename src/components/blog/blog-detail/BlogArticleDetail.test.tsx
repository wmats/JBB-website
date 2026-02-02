import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";

// Mock Next.js components BEFORE imports that use them
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

// Mock next/router
vi.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "/blog/test-article",
    pathname: "/blog/[articleId]",
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    route: "/blog/[articleId]",
  }),
}));

import { renderWithChakra, mockBlogPost, mockComment } from "../../../test-utils";
import BlogArticleDetail from "./BlogArticleDetail";

// Mock Chakra useMediaQuery
vi.mock("@chakra-ui/react", async () => {
  const actual: any = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    useMediaQuery: () => [true], // Default to larger screen
  };
});

// Mock react-share
vi.mock("react-share", () => ({
  EmailShareButton: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  EmailIcon: () => <div>Email Icon</div>,
  FacebookShareButton: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  FacebookIcon: () => <div>Facebook Icon</div>,
  TwitterShareButton: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  TwitterIcon: () => <div>Twitter Icon</div>,
  WhatsappShareButton: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  WhatsappIcon: () => <div>Whatsapp Icon</div>,
}));

// Mock ReactMarkdown
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <div>{children}</div>,
}));

// Mock CommentsSection
vi.mock("./CommentsSection", () => ({
  default: () => <div>Comments Section</div>,
}));

// Mock VideoEmbed
vi.mock("./VideoEmbed", () => ({
  default: () => <div>Video Embed</div>,
}));

describe("<BlogArticleDetail />", () => {
  const mockArticle = mockBlogPost({
    title: "Test Article",
    description: "Test description",
    issueDate: "2024-01-15",
    categories: ["Beauty", "Skincare"],
  });

  const mockPrevNextPosts = [
    { id: 1, documentId: "prev-post", title: "Previous Post" },
    { id: 2, documentId: "next-post", title: "Next Post" },
  ];

  const mockRecommendedArticles = [
    mockBlogPost({ id: 1, title: "Recommended Article 1" }),
    mockBlogPost({ id: 2, title: "Recommended Article 2" }),
    mockBlogPost({ id: 3, title: "Recommended Article 3" }),
  ];

  const mockArticleComments = [
    mockComment({ id: 1, Content: "Test comment 1" }),
    mockComment({ id: 2, Content: "Test comment 2" }),
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders article title", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  test("renders article image", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    const img = screen.getByAltText("Test Article");
    expect(img).toBeInTheDocument();
  });

  test("renders author name", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Julie")).toBeInTheDocument();
  });

  test("renders formatted date", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("15 Janvier 2024")).toBeInTheDocument();
  });

  test("renders article categories", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Beauty")).toBeInTheDocument();
    expect(screen.getByText("Skincare")).toBeInTheDocument();
  });

  test("renders comment count", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("2 Commentaires")).toBeInTheDocument();
  });

  test("renders article description", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  test("renders share section", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("PARTAGER CET ARTICLE")).toBeInTheDocument();
  });

  test("renders social share buttons", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Email Icon")).toBeInTheDocument();
    expect(screen.getByText("Facebook Icon")).toBeInTheDocument();
    expect(screen.getByText("Twitter Icon")).toBeInTheDocument();
    expect(screen.getByText("Whatsapp Icon")).toBeInTheDocument();
  });

  test("renders previous post link", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Article Précédent")).toBeInTheDocument();
    expect(screen.getByText("Previous Post")).toBeInTheDocument();
  });

  test("renders next post link", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Article Suivant")).toBeInTheDocument();
    expect(screen.getByText("Next Post")).toBeInTheDocument();
  });

  test("renders recommended articles section", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("ARTICLES RECOMMANDES")).toBeInTheDocument();
  });

  test("renders recommended article titles", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Recommended Article 1")).toBeInTheDocument();
    expect(screen.getByText("Recommended Article 2")).toBeInTheDocument();
    expect(screen.getByText("Recommended Article 3")).toBeInTheDocument();
  });

  test("renders comments section", () => {
    renderWithChakra(
      <BlogArticleDetail
        article={mockArticle}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Comments Section")).toBeInTheDocument();
  });

  test("renders video embed when videoUrl is provided", () => {
    const articleWithVideo = mockBlogPost({
      ...mockArticle,
      videoUrl: "https://youtube.com/watch?v=test",
    });
    renderWithChakra(
      <BlogArticleDetail
        article={articleWithVideo}
        prevNextPosts={mockPrevNextPosts}
        recommendedArticles={mockRecommendedArticles}
        articleComments={mockArticleComments}
      />
    );
    expect(screen.getByText("Video Embed")).toBeInTheDocument();
  });
});
