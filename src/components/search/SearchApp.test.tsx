import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import SearchComponent from "./SearchApp";
import { renderWithChakra } from "../../test-utils";

// Type assertion for the wrapped component
const Search = SearchComponent as React.ComponentType<{
  searchState: Record<string, unknown>;
  onSearchStateChange: () => void;
  createURL: () => void;
}>;

// Mock algoliasearch
vi.mock("algoliasearch", () => ({
  default: vi.fn(() => ({
    search: vi.fn(),
    searchForFacetValues: vi.fn(),
  })),
}));

// Mock react-instantsearch-dom
vi.mock("react-instantsearch-dom", () => ({
  InstantSearch: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="instant-search">{children}</div>
  ),
  connectSearchBox: (Component: React.ComponentType<Record<string, unknown>>) =>
    Component,
  connectStateResults: (
    Component: React.ComponentType<Record<string, unknown>>,
  ) => Component,
}));

// Mock CustomSearchBox
vi.mock("./CustomSearchBox", () => ({
  default: () => <div data-testid="custom-search-box">Search Box</div>,
}));

// Mock CustomHits
vi.mock("./CustomHits", () => ({
  default: () => <div data-testid="custom-hits">Hits</div>,
}));

// Mock URLSync HOC
vi.mock("./URLSync", () => ({
  default: <P extends Record<string, unknown>>(
    Component: React.ComponentType<P>,
  ): React.ComponentType<P> => Component,
}));

describe("<SearchApp />", () => {
  const mockSearchState = {};
  const mockOnSearchStateChange = vi.fn();
  const mockCreateURL = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders search heading", () => {
    renderWithChakra(
      <Search
        searchState={mockSearchState}
        onSearchStateChange={mockOnSearchStateChange}
        createURL={mockCreateURL}
      />,
    );
    expect(screen.getByText("Que cherchez-vous ?")).toBeInTheDocument();
  });

  test("renders InstantSearch component", () => {
    renderWithChakra(
      <Search
        searchState={mockSearchState}
        onSearchStateChange={mockOnSearchStateChange}
        createURL={mockCreateURL}
      />,
    );
    expect(screen.getByTestId("instant-search")).toBeInTheDocument();
  });

  test("renders CustomSearchBox component", () => {
    renderWithChakra(
      <Search
        searchState={mockSearchState}
        onSearchStateChange={mockOnSearchStateChange}
        createURL={mockCreateURL}
      />,
    );
    expect(screen.getByTestId("custom-search-box")).toBeInTheDocument();
  });

  test("renders CustomHits component", () => {
    renderWithChakra(
      <Search
        searchState={mockSearchState}
        onSearchStateChange={mockOnSearchStateChange}
        createURL={mockCreateURL}
      />,
    );
    expect(screen.getByTestId("custom-hits")).toBeInTheDocument();
  });
});
