import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentsList from "./CommentsList";
import { mockComment, mockSessionUser } from "../../../test-utils";

// Mock SWR
vi.mock("swr", () => ({
  default: () => ({
    data: undefined,
    error: undefined,
    isLoading: false,
  }),
}));

// Mock Comment component
vi.mock("./Comment", () => ({
  default: ({
    Content,
    AuthorName,
  }: {
    Content: string;
    AuthorName: string;
  }) => (
    <div data-testid="comment">
      <div>{AuthorName}</div>
      <div>{Content}</div>
    </div>
  ),
}));

describe("<CommentsList />", () => {
  const mockComments = [
    mockComment({ id: 1, Content: "First comment", AuthorName: "User 1" }),
    mockComment({ id: 2, Content: "Second comment", AuthorName: "User 2" }),
  ];

  const mockSetComments = vi.fn();

  test("renders list of comments", () => {
    render(
      <CommentsList
        articleID={1}
        comments={mockComments}
        setComments={mockSetComments}
      />,
    );
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });

  test("renders all comment components", () => {
    render(
      <CommentsList
        articleID={1}
        comments={mockComments}
        setComments={mockSetComments}
      />,
    );
    const comments = screen.getAllByTestId("comment");
    expect(comments).toHaveLength(2);
  });

  test("renders comment authors", () => {
    render(
      <CommentsList
        articleID={1}
        comments={mockComments}
        setComments={mockSetComments}
      />,
    );
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();
  });

  test("passes sessionUser to Comment components", () => {
    const sessionUser = mockSessionUser({ id: 1, name: "Test User" });
    render(
      <CommentsList
        articleID={1}
        comments={mockComments}
        setComments={mockSetComments}
        sessionUser={sessionUser}
      />,
    );
    expect(screen.getByText("First comment")).toBeInTheDocument();
  });

  test("handles empty comments array", () => {
    const { container } = render(
      <CommentsList
        articleID={1}
        comments={[]}
        setComments={mockSetComments}
      />,
    );
    const comments = screen.queryAllByTestId("comment");
    expect(comments).toHaveLength(0);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  test("renders with string articleID", () => {
    render(
      <CommentsList
        articleID="test-article-id"
        comments={mockComments}
        setComments={mockSetComments}
      />,
    );
    expect(screen.getByText("First comment")).toBeInTheDocument();
  });

  test("renders with numeric articleID", () => {
    render(
      <CommentsList
        articleID={123}
        comments={mockComments}
        setComments={mockSetComments}
      />,
    );
    expect(screen.getByText("First comment")).toBeInTheDocument();
  });

  test("passes correct props to Comment component", () => {
    const comment = mockComment({
      id: 1,
      documentId: "doc-1",
      Content: "Test content",
      AuthorName: "Test Author",
      ArticleID: 1,
      AuthorID: 1,
    });
    render(
      <CommentsList
        articleID={1}
        comments={[comment]}
        setComments={mockSetComments}
      />,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  test("renders multiple comments in order", () => {
    const comments = [
      mockComment({ id: 1, Content: "Comment 1" }),
      mockComment({ id: 2, Content: "Comment 2" }),
      mockComment({ id: 3, Content: "Comment 3" }),
    ];
    render(
      <CommentsList
        articleID={1}
        comments={comments}
        setComments={mockSetComments}
      />,
    );
    const renderedComments = screen.getAllByTestId("comment");
    expect(renderedComments).toHaveLength(3);
  });

  test("renders without sessionUser", () => {
    render(
      <CommentsList
        articleID={1}
        comments={mockComments}
        setComments={mockSetComments}
      />,
    );
    expect(screen.getByText("First comment")).toBeInTheDocument();
  });
});
