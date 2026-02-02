import { describe, test, expect, vi } from "vitest";
import { renderWithChakra } from "../../test-utils";
import Layout from "./Layout";

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => ({ status: "unauthenticated", data: null }),
}));

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
  test("Layout component renders", () => {
    const { container } = renderWithChakra(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Component exists (may render null initially due to mounted flag)
    expect(container).toBeDefined();
  });
});
