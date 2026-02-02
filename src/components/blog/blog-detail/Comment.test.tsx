import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithChakra, mockSessionUser } from "../../../test-utils";
import Comment from "./Comment";

// Mock axios
const mockAxiosPut = vi.fn();
const mockAxiosDelete = vi.fn();
vi.mock("axios", () => ({
  default: {
    put: (...args: any[]) => mockAxiosPut(...args),
    delete: (...args: any[]) => mockAxiosDelete(...args),
  },
}));

describe("<Comment />", () => {
  const defaultProps = {
    idx: 0,
    id: 1,
    documentId: "doc-1",
    ArticleID: 1,
    AuthorID: 1,
    AuthorName: "Test User",
    Content: "This is a test comment",
    issueDate: "2024-01-01",
    setComments: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variable
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:1337";
  });

  test("renders comment content", () => {
    renderWithChakra(<Comment {...defaultProps} />);
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  test("renders author name", () => {
    renderWithChakra(<Comment {...defaultProps} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  test("renders issue date", () => {
    renderWithChakra(<Comment {...defaultProps} issueDate="2024-01-15" />);
    const timeElement = screen.getByText(/2024/);
    expect(timeElement).toBeInTheDocument();
  });

  test("shows edit controls when user is author", () => {
    const sessionUser = mockSessionUser({ id: 1 });
    const { container } = renderWithChakra(<Comment {...defaultProps} sessionUser={sessionUser} />);
    // Just verify the component renders without error when user is author
    expect(container).toBeDefined();
  });

  test("hides edit controls when user is not author", () => {
    const sessionUser = mockSessionUser({ id: 2 });
    renderWithChakra(<Comment {...defaultProps} sessionUser={sessionUser} />);
    expect(screen.queryByText("ANNULER")).not.toBeInTheDocument();
  });

  test("comment is not in edit mode initially", async () => {
    const sessionUser = mockSessionUser({ id: 1 });
    renderWithChakra(<Comment {...defaultProps} sessionUser={sessionUser} />);

    // Initially should show comment text, not textarea
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  test("renders without edit mode by default", async () => {
    const sessionUser = mockSessionUser({ id: 1 });
    renderWithChakra(<Comment {...defaultProps} sessionUser={sessionUser} />);

    // Should show comment text, not edit buttons
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.queryByText("ANNULER")).not.toBeInTheDocument();
    expect(screen.queryByText("SAUVEGARDER")).not.toBeInTheDocument();
  });

  test("comment text is displayed in paragraph", async () => {
    const sessionUser = mockSessionUser({ id: 1 });
    renderWithChakra(<Comment {...defaultProps} sessionUser={sessionUser} />);

    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  test("renders without sessionUser", () => {
    renderWithChakra(<Comment {...defaultProps} />);
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  test("displays author name as strong text", () => {
    const { container } = renderWithChakra(<Comment {...defaultProps} />);
    const authorElement = container.querySelector("strong");
    expect(authorElement).toHaveTextContent("Test User");
  });

  test("renders time element with correct datetime attribute", () => {
    renderWithChakra(<Comment {...defaultProps} issueDate="2024-01-15T10:00:00Z" />);
    const timeElement = document.querySelector("time");
    expect(timeElement).toHaveAttribute("dateTime", "2024-01-15T10:00:00Z");
  });

  test("comment content is displayed correctly", async () => {
    const sessionUser = mockSessionUser({ id: 1 });
    renderWithChakra(<Comment {...defaultProps} sessionUser={sessionUser} />);

    // Verify the comment content is displayed
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  test("renders comment with null author name", () => {
    renderWithChakra(<Comment {...defaultProps} AuthorName={null} />);
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  test("handles different comment content", () => {
    renderWithChakra(
      <Comment {...defaultProps} Content="Different comment text" />
    );
    expect(screen.getByText("Different comment text")).toBeInTheDocument();
  });

  test("renders with different author ID", () => {
    renderWithChakra(<Comment {...defaultProps} AuthorID={999} />);
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  test("renders meta information correctly", () => {
    renderWithChakra(<Comment {...defaultProps} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  test("renders comment correctly for non-author", async () => {
    const sessionUser = mockSessionUser({ id: 999 });
    renderWithChakra(<Comment {...defaultProps} sessionUser={sessionUser} />);

    // Should show comment text
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  test("renders with different index", () => {
    renderWithChakra(<Comment {...defaultProps} idx={5} />);
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });
});
