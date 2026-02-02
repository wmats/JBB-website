import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./Layout";

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => ({ status: "unauthenticated", data: null }),
}));

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

// Mock child components to simplify testing
vi.mock("./MainNavigation", () => ({
  default: () => <div data-testid="main-navigation">MainNavigation</div>,
}));

vi.mock("./Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("./StickyHeader", () => ({
  default: () => <div data-testid="sticky-header">StickyHeader</div>,
}));

describe("<Layout />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders children content", async () => {
    renderWithChakra(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  test("renders MainNavigation component", async () => {
    renderWithChakra(<Layout><div>Content</div></Layout>);

    await waitFor(() => {
      expect(screen.getByTestId("main-navigation")).toBeInTheDocument();
    });
  });

  test("renders Footer component", async () => {
    renderWithChakra(<Layout><div>Content</div></Layout>);

    await waitFor(() => {
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });

  test("renders StickyHeader component", async () => {
    renderWithChakra(<Layout><div>Content</div></Layout>);

    await waitFor(() => {
      expect(screen.getByTestId("sticky-header")).toBeInTheDocument();
    });
  });

  test("wraps children in main element", async () => {
    const { container } = renderWithChakra(
      <Layout><div>Test</div></Layout>
    );

    await waitFor(() => {
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main?.textContent).toContain("Test");
    });
  });

  test("renders null when not mounted initially", () => {
    const { container } = render(<Layout><div>Test</div></Layout>);
    // Initial render returns null before mount
    expect(container.firstChild).toBeNull();
  });
});
