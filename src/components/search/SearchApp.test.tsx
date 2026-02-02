import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Search from "./SearchApp";
import { renderWithChakra } from "../../test-utils";

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
  connectSearchBox: (Component: any) => Component,
  connectStateResults: (Component: any) => Component,
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
  default: (Component: any) => Component,
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
      />
    );
    expect(screen.getByText("Que cherchez-vous ?")).toBeInTheDocument();
  });

  test("renders InstantSearch component", () => {
    renderWithChakra(
      <Search
        searchState={mockSearchState}
        onSearchStateChange={mockOnSearchStateChange}
        createURL={mockCreateURL}
      />
    );
    expect(screen.getByTestId("instant-search")).toBeInTheDocument();
  });

  test("renders CustomSearchBox component", () => {
    renderWithChakra(
      <Search
        searchState={mockSearchState}
        onSearchStateChange={mockOnSearchStateChange}
        createURL={mockCreateURL}
      />
    );
    expect(screen.getByTestId("custom-search-box")).toBeInTheDocument();
  });

  test("renders CustomHits component", () => {
    renderWithChakra(
      <Search
        searchState={mockSearchState}
        onSearchStateChange={mockOnSearchStateChange}
        createURL={mockCreateURL}
      />
    );
    expect(screen.getByTestId("custom-hits")).toBeInTheDocument();
  });
});
