import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../test-utils";
import SignupHeading from "./SignupHeading";

describe("<SignupHeading />", () => {
  test("renders Mon compte heading", () => {
    renderWithChakra(<SignupHeading />);
    expect(screen.getByText("Mon compte")).toBeInTheDocument();
  });

  test("renders S'inscrire breadcrumb", () => {
    renderWithChakra(<SignupHeading />);
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
  });

  test("renders home icon link", () => {
    renderWithChakra(<SignupHeading />);
    const homeLink = screen.getByRole("link", { name: "" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders as header element", () => {
    const { container } = renderWithChakra(<SignupHeading />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});
