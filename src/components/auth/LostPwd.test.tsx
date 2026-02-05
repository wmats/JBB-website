import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import LostPwd from "./LostPwd";
import { renderWithChakra } from "../../test-utils";

// Mock axios
vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("<LostPwd />", () => {
  const mockSetError = vi.fn();
  const mockSetSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders instructions text", () => {
    renderWithChakra(
      <LostPwd setError={mockSetError} setSuccess={mockSetSuccess} />,
    );
    expect(
      screen.getByText(/Vous avez oublié votre mot de passe/),
    ).toBeInTheDocument();
  });

  test("renders email input field", () => {
    const { container } = renderWithChakra(
      <LostPwd setError={mockSetError} setSuccess={mockSetSuccess} />,
    );
    const emailInput = container.querySelector('input[name="email"]');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  test("renders submit button", () => {
    renderWithChakra(
      <LostPwd setError={mockSetError} setSuccess={mockSetSuccess} />,
    );
    expect(
      screen.getByRole("button", { name: "Réinitialiser mon mot de passe" }),
    ).toBeInTheDocument();
  });

  test("submit button is not disabled by default", () => {
    renderWithChakra(
      <LostPwd setError={mockSetError} setSuccess={mockSetSuccess} />,
    );
    const button = screen.getByRole("button", {
      name: "Réinitialiser mon mot de passe",
    });
    expect(button).not.toBeDisabled();
  });
});
