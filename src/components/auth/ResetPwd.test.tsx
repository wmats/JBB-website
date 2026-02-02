import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ResetPwd from "./ResetPwd";
import { renderWithChakra } from "../../test-utils";

// Mock Next.js router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { code: "test-reset-code" },
  }),
}));

// Mock axios
vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("<ResetPwd />", () => {
  const mockSetError = vi.fn();
  const mockSetSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders instructions text", () => {
    renderWithChakra(<ResetPwd setError={mockSetError} setSuccess={mockSetSuccess} />);
    expect(
      screen.getByText("Veuillez saisir votre nouveau mot de passe.")
    ).toBeInTheDocument();
  });

  test("renders password input field", () => {
    const { container } = renderWithChakra(<ResetPwd setError={mockSetError} setSuccess={mockSetSuccess} />);
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBeGreaterThanOrEqual(1);
  });

  test("renders confirm password input field", () => {
    const { container } = renderWithChakra(<ResetPwd setError={mockSetError} setSuccess={mockSetSuccess} />);
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
  });

  test("renders submit button", () => {
    renderWithChakra(<ResetPwd setError={mockSetError} setSuccess={mockSetSuccess} />);
    expect(
      screen.getByRole("button", { name: "Changer mon mot de passe" })
    ).toBeInTheDocument();
  });

  test("submit button is not disabled by default", () => {
    renderWithChakra(<ResetPwd setError={mockSetError} setSuccess={mockSetSuccess} />);
    const button = screen.getByRole("button", { name: "Changer mon mot de passe" });
    expect(button).not.toBeDisabled();
  });
});
