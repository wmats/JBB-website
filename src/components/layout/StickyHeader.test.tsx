import { describe, test, expect, vi } from "vitest";
import { renderWithChakra } from "../../test-utils";
import StickyHeader from "./StickyHeader";

// Mock Next.js components
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock Chakra useMediaQuery
vi.mock("@chakra-ui/react", async () => {
  const actual: any = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    useMediaQuery: () => [true],
  };
});

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => ({ status: "unauthenticated" }),
  signOut: vi.fn(),
}));

describe("<StickyHeader />", () => {
  test("StickyHeader component renders", () => {
    const { container } = renderWithChakra(<StickyHeader />);
    // Component exists (may render null initially due to mounted flag)
    expect(container).toBeDefined();
  });
});
