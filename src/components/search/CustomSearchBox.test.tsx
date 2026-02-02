import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderWithChakra } from "../../test-utils";

// Mock react-instantsearch-dom BEFORE importing the component
vi.mock("react-instantsearch-dom", () => ({
  connectSearchBox: (Component: any) => {
    return (props: any) => <Component refine={vi.fn()} {...props} />;
  },
}));

// Import component AFTER mocking dependencies
import CustomSearchBox from "./CustomSearchBox";

describe("<CustomSearchBox />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders search input field", () => {
    renderWithChakra(<CustomSearchBox />);
    const input = screen.getByPlaceholderText("Chercher un article...");
    expect(input).toBeInTheDocument();
  });

  test("search input has correct type", () => {
    renderWithChakra(<CustomSearchBox />);
    const input = screen.getByPlaceholderText("Chercher un article...");
    expect(input).toHaveAttribute("type", "search");
  });

  test("search input has maxLength attribute", () => {
    renderWithChakra(<CustomSearchBox />);
    const input = screen.getByPlaceholderText("Chercher un article...");
    expect(input).toHaveAttribute("maxLength", "400");
  });

  test("renders within a form", () => {
    const { container } = renderWithChakra(<CustomSearchBox />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
