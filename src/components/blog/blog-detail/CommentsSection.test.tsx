import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderWithChakra, mockBlogPost, mockComment } from "../../../test-utils";
import CommentsSection from "./CommentsSection";
import { screen, fireEvent, waitFor } from "@testing-library/react";

// Mock next-auth
const mockUseSession = vi.fn();
vi.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock CommentsList component
vi.mock("./CommentsList", () => ({
  default: ({ comments }: any) => (
    <div data-testid="comments-list">
      {comments.map((comment: any) => (
        <div key={comment.id}>{comment.Content}</div>
      ))}
    </div>
  ),
}));

// Mock axios
const mockAxiosPost = vi.fn();
vi.mock("axios", () => ({
  default: {
    post: (...args: any[]) => mockAxiosPost(...args),
  },
}));

describe("<CommentsSection />", () => {
  const mockArticle = mockBlogPost({ id: 1, title: "Test Article" });
  const mockComments = [
    mockComment({ id: 1, Content: "Comment 1" }),
    mockComment({ id: 2, Content: "Comment 2" }),
  ];
  const mockSetComments = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:1337";
  });

  test("renders section heading", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    expect(screen.getByText("Laisser un commentaire")).toBeInTheDocument();
  });

  test("renders login prompt when user is not authenticated", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    expect(screen.getByText(/Vous devez être/i)).toBeInTheDocument();
    expect(screen.getByText("connecté")).toBeInTheDocument();
  });

  test("renders link to signin page when not authenticated", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    const signinLink = screen.getByRole("link", { name: /connecté/i });
    expect(signinLink).toBeInTheDocument();
    expect(signinLink).toHaveAttribute("href", "/auth/signin");
  });

  test("renders textarea when user is authenticated", () => {
    const session = {
      user: { id: 1, name: "Test User", email: "test@test.com", accessToken: "token" },
    };
    mockUseSession.mockReturnValue({ data: session, status: "authenticated" });

    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    expect(screen.getByPlaceholderText("Ajoutez un commentaire...")).toBeInTheDocument();
  });

  test("shows buttons when textarea is focused", async () => {
    const session = {
      user: { id: 1, name: "Test User", email: "test@test.com", accessToken: "token" },
    };
    mockUseSession.mockReturnValue({ data: session, status: "authenticated" });

    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );

    const textarea = screen.getByPlaceholderText("Ajoutez un commentaire...");
    fireEvent.focus(textarea);

    await waitFor(() => {
      expect(screen.getByText("ANNULER")).toBeInTheDocument();
      expect(screen.getByText("AJOUTER UN COMMENTAIRE")).toBeInTheDocument();
    });
  });

  test("submit button is disabled when textarea is empty", async () => {
    const session = {
      user: { id: 1, name: "Test User", email: "test@test.com", accessToken: "token" },
    };
    mockUseSession.mockReturnValue({ data: session, status: "authenticated" });

    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );

    const textarea = screen.getByPlaceholderText("Ajoutez un commentaire...");
    fireEvent.focus(textarea);

    await waitFor(() => {
      const submitButton = screen.getByText("AJOUTER UN COMMENTAIRE");
      expect(submitButton).toBeDisabled();
    });
  });

  test("submit button is enabled when textarea has text", async () => {
    const session = {
      user: { id: 1, name: "Test User", email: "test@test.com", accessToken: "token" },
    };
    mockUseSession.mockReturnValue({ data: session, status: "authenticated" });

    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );

    const textarea = screen.getByPlaceholderText("Ajoutez un commentaire...");
    fireEvent.focus(textarea);
    fireEvent.change(textarea, { target: { value: "New comment" } });

    await waitFor(() => {
      const submitButton = screen.getByText("AJOUTER UN COMMENTAIRE");
      expect(submitButton).not.toBeDisabled();
    });
  });

  test("cancel button clears textarea", async () => {
    const session = {
      user: { id: 1, name: "Test User", email: "test@test.com", accessToken: "token" },
    };
    mockUseSession.mockReturnValue({ data: session, status: "authenticated" });

    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );

    const textarea = screen.getByPlaceholderText(
      "Ajoutez un commentaire..."
    ) as HTMLTextAreaElement;
    fireEvent.focus(textarea);
    fireEvent.change(textarea, { target: { value: "Test comment" } });

    await waitFor(() => {
      expect(textarea.value).toBe("Test comment");
    });

    const cancelButton = screen.getByText("ANNULER");
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(textarea.value).toBe("");
    });
  });

  test("renders CommentsList component", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    expect(screen.getByTestId("comments-list")).toBeInTheDocument();
  });

  test("renders existing comments", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    expect(screen.getByText("Comment 1")).toBeInTheDocument();
    expect(screen.getByText("Comment 2")).toBeInTheDocument();
  });

  test("handles empty comments array", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={[]}
        setComments={mockSetComments}
      />
    );
    expect(screen.getByTestId("comments-list")).toBeInTheDocument();
  });

  test("textarea has correct attributes", () => {
    const session = {
      user: { id: 1, name: "Test User", email: "test@test.com", accessToken: "token" },
    };
    mockUseSession.mockReturnValue({ data: session, status: "authenticated" });

    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );

    const textarea = screen.getByPlaceholderText("Ajoutez un commentaire...");
    expect(textarea).toHaveAttribute("required");
    expect(textarea).toHaveAttribute("minLength", "1");
    expect(textarea).toHaveAttribute("maxLength", "2000");
    expect(textarea).toHaveAttribute("rows", "1");
  });

  test("renders without crashing when session is loading", () => {
    mockUseSession.mockReturnValue({ data: null, status: "loading" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    expect(screen.getByText("Laisser un commentaire")).toBeInTheDocument();
  });

  test("does not render textarea when not authenticated", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    expect(screen.queryByPlaceholderText("Ajoutez un commentaire...")).not.toBeInTheDocument();
  });

  test("renders section element", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    const { container } = renderWithChakra(
      <CommentsSection
        article={mockArticle}
        comments={mockComments}
        setComments={mockSetComments}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
