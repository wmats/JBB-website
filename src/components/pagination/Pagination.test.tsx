import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Pagination from "./Pagination";

describe("<Pagination />", () => {
  const defaultProps = {
    onPageChange: vi.fn(),
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    className: "test-class",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns null when currentPage is 0", () => {
    const { container } = render(
      <Pagination {...defaultProps} currentPage={0} />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("returns null when pagination range is too small", () => {
    const { container } = render(
      <Pagination {...defaultProps} totalCount={5} />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders page numbers correctly", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("calls onPageChange when page number clicked", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

    const page2 = screen.getByText("2");
    fireEvent.click(page2);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("next button increments page", () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination {...defaultProps} onPageChange={onPageChange} />,
    );

    const paginationItems = container.querySelectorAll("li");
    const nextButton = paginationItems[paginationItems.length - 1];
    if (nextButton) fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("previous button decrements page", () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        onPageChange={onPageChange}
      />,
    );

    const paginationItems = container.querySelectorAll("li");
    const prevButton = paginationItems[0];
    if (prevButton) fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test("disables previous button on first page", () => {
    const { container } = render(
      <Pagination {...defaultProps} currentPage={1} />,
    );
    const paginationItems = container.querySelectorAll("li");
    const prevButton = paginationItems[0];
    // Check if any class name includes "disabled" (CSS modules hash class names)
    const hasDisabledClass = Array.from(prevButton?.classList || []).some(
      (cls) => cls.includes("disabled"),
    );
    expect(hasDisabledClass).toBe(true);
  });

  test("disables next button on last page", () => {
    const { container } = render(
      <Pagination {...defaultProps} currentPage={10} />,
    );
    const paginationItems = container.querySelectorAll("li");
    const nextButton = paginationItems[paginationItems.length - 1];
    // Check if any class name includes "disabled" (CSS modules hash class names)
    const hasDisabledClass = Array.from(nextButton?.classList || []).some(
      (cls) => cls.includes("disabled"),
    );
    expect(hasDisabledClass).toBe(true);
  });

  test("highlights current page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const currentPageElement = screen.getByText("3").closest("li");
    expect(currentPageElement?.className).toContain("selected");
  });

  test("renders dots when appropriate", () => {
    render(<Pagination {...defaultProps} totalCount={200} currentPage={10} />);
    const dots = screen.getAllByText("…");
    expect(dots.length).toBeGreaterThan(0);
  });

  test("applies custom className", () => {
    const { container } = render(
      <Pagination {...defaultProps} className="custom-pagination" />,
    );
    const paginationContainer = container.querySelector(".custom-pagination");
    expect(paginationContainer).toBeInTheDocument();
  });
});
