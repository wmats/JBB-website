import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Signup from "./Signup";
import { renderWithChakra } from "../../test-utils";

// Mock Next.js router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
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
}));

// Mock axios
vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("<Signup />", () => {
  const mockSetError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders signup heading", () => {
    renderWithChakra(<Signup setError={mockSetError} />);
    expect(screen.getByText("Inscription")).toBeInTheDocument();
  });

  test("renders username input field", () => {
    const { container } = renderWithChakra(<Signup setError={mockSetError} />);
    const usernameInput = container.querySelector('input[name="username"]');
    expect(usernameInput).toBeInTheDocument();
  });

  test("renders email input field", () => {
    const { container } = renderWithChakra(<Signup setError={mockSetError} />);
    const emailInput = container.querySelector('input[name="email"]');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  test("renders password input field", () => {
    const { container } = renderWithChakra(<Signup setError={mockSetError} />);
    const passwordInput = container.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders submit button", () => {
    renderWithChakra(<Signup setError={mockSetError} />);
    expect(
      screen.getByRole("button", { name: "S'inscrire" }),
    ).toBeInTheDocument();
  });

  test("renders login link", () => {
    renderWithChakra(<Signup setError={mockSetError} />);
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
  });

  test("renders already registered message", () => {
    renderWithChakra(<Signup setError={mockSetError} />);
    expect(screen.getByText(/Déjà inscrit/)).toBeInTheDocument();
  });
});
