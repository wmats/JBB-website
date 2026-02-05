import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Login from "./Login";
import { renderWithChakra } from "../../test-utils";

// Mock Next.js router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    asPath: "/login",
    query: {},
  }),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next-auth
vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  useSession: () => ({ data: null, status: "unauthenticated" }),
}));

describe("<Login />", () => {
  const mockSetError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login heading", () => {
    renderWithChakra(<Login setError={mockSetError} />);
    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });

  test("renders email input field", () => {
    const { container } = renderWithChakra(<Login setError={mockSetError} />);
    const emailInput = container.querySelector('input[name="email"]');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  test("renders password input field", () => {
    const { container } = renderWithChakra(<Login setError={mockSetError} />);
    const passwordInput = container.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders submit button", () => {
    renderWithChakra(<Login setError={mockSetError} />);
    expect(
      screen.getByRole("button", { name: "Se connecter" }),
    ).toBeInTheDocument();
  });

  test("renders forgot password link", () => {
    renderWithChakra(<Login setError={mockSetError} />);
    expect(screen.getByText("Mot de passe oublié ?")).toBeInTheDocument();
  });

  test("renders signup link", () => {
    renderWithChakra(<Login setError={mockSetError} />);
    expect(screen.getByText("S'enregistrer")).toBeInTheDocument();
  });

  test("renders not registered message", () => {
    renderWithChakra(<Login setError={mockSetError} />);
    expect(screen.getByText(/Pas encore inscrit/)).toBeInTheDocument();
  });
});
