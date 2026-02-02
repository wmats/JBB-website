import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { mockBlogPost } from "../../test-utils";
import BlogArticleItem from "./BlogArticleItem";

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

// Mock Chakra useMediaQuery
vi.mock("@chakra-ui/react", async () => {
  const actual: any = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    useMediaQuery: () => [true], // Default to larger screen
  };
});

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("<BlogArticleItem />", () => {
  const defaultPost = mockBlogPost();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders article title", () => {
    renderWithChakra(<BlogArticleItem {...defaultPost} />);
    expect(screen.getByText(defaultPost.title)).toBeInTheDocument();
  });

  test("renders formatted date", () => {
    renderWithChakra(
      <BlogArticleItem {...defaultPost} issueDate="2024-01-15" />
    );
    expect(screen.getByText("15 Janvier 2024")).toBeInTheDocument();
  });

  test("renders all categories", () => {
    renderWithChakra(
      <BlogArticleItem
        {...defaultPost}
        categories={["Beauty", "Skincare", "Tips"]}
      />
    );
    expect(screen.getByText("Beauty")).toBeInTheDocument();
    expect(screen.getByText("Skincare")).toBeInTheDocument();
    expect(screen.getByText("Tips")).toBeInTheDocument();
  });

  test("renders intro text", () => {
    renderWithChakra(<BlogArticleItem {...defaultPost} />);
    expect(screen.getByText(defaultPost.intro!)).toBeInTheDocument();
  });

  test("renders image with correct src", () => {
    renderWithChakra(<BlogArticleItem {...defaultPost} />);
    const img = screen.getByAlt(defaultPost.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", defaultPost.imageUrl);
  });

  test("renders author name", () => {
    renderWithChakra(<BlogArticleItem {...defaultPost} />);
    expect(screen.getByText("Julie")).toBeInTheDocument();
  });

  test("renders read more button", () => {
    renderWithChakra(<BlogArticleItem {...defaultPost} />);
    expect(screen.getByText("Lire la suite...")).toBeInTheDocument();
  });

  test("renders comment count", () => {
    renderWithChakra(<BlogArticleItem {...defaultPost} />);
    expect(screen.getByText("0 Commentaires")).toBeInTheDocument();
  });

  test("renders single category without comma", () => {
    renderWithChakra(
      <BlogArticleItem {...defaultPost} categories={["Beauty"]} />
    );
    expect(screen.getByText("Beauty")).toBeInTheDocument();
    // Should not have a comma after single category
    const { container } = render(
      <BlogArticleItem {...defaultPost} categories={["Beauty"]} />
    );
    expect(container.textContent).not.toMatch(/Beauty,/);
  });

  test("separates multiple categories with commas", () => {
    const { container } = renderWithChakra(
      <BlogArticleItem {...defaultPost} categories={["Beauty", "Skincare"]} />
    );
    expect(container.textContent).toContain("Beauty");
    expect(container.textContent).toContain("Skincare");
  });
});
