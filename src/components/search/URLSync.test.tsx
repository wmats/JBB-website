import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import withUrlSync from "./URLSync";

// Mock window.history
const mockPushState = vi.fn();
Object.defineProperty(window, "history", {
  value: { pushState: mockPushState },
  writable: true,
});

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    pathname: "/search",
    search: "",
  },
  writable: true,
});

describe("withUrlSync HOC", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("wraps component and passes props", () => {
    const TestComponent = ({ searchState, onSearchStateChange, createURL }: any) => (
      <div data-testid="test-component">
        <div data-testid="has-props">
          {searchState && onSearchStateChange && createURL ? "Props passed" : "No props"}
        </div>
      </div>
    );

    const WrappedComponent = withUrlSync(TestComponent);
    render(<WrappedComponent />);

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
    expect(screen.getByTestId("has-props")).toHaveTextContent("Props passed");
  });

  test("returns a component function", () => {
    const TestComponent = () => <div>Test</div>;
    const WrappedComponent = withUrlSync(TestComponent);

    expect(typeof WrappedComponent).toBe("function");
  });
});
