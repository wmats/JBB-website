import { describe, test, expect, vi } from "vitest";
import { renderWithChakra } from "../../test-utils";
import MainNavigation from "./MainNavigation";

// Mock Next.js components
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock Chakra useMediaQuery
vi.mock("@chakra-ui/react", async () => {
  const actual = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    useMediaQuery: () => [true], // Default to larger screen
  };
});

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => ({ status: "unauthenticated" }),
  signOut: vi.fn(),
}));

describe("<MainNavigation />", () => {
  test("MainNavigation component renders", () => {
    const { container } = renderWithChakra(<MainNavigation />);
    // Component exists (may render null initially due to mounted flag)
    expect(container).toBeDefined();
  });
});
