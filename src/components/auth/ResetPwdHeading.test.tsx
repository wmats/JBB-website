import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../test-utils";
import ResetPwdHeading from "./ResetPwdHeading";

describe("<ResetPwdHeading />", () => {
  test("renders Mon compte heading", () => {
    renderWithChakra(<ResetPwdHeading />);
    expect(screen.getByText("Mon compte")).toBeInTheDocument();
  });

  test("renders Modifier mot de passe breadcrumb", () => {
    renderWithChakra(<ResetPwdHeading />);
    expect(screen.getByText("Modifier mot de passe")).toBeInTheDocument();
  });

  test("renders Connexion breadcrumb link", () => {
    renderWithChakra(<ResetPwdHeading />);
    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });

  test("renders home icon link", () => {
    renderWithChakra(<ResetPwdHeading />);
    const links = screen.getAllByRole("link");
    const homeLink = links.find((link) => link.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });

  test("renders login link", () => {
    renderWithChakra(<ResetPwdHeading />);
    const links = screen.getAllByRole("link");
    const loginLink = links.find((link) => link.getAttribute("href") === "/login");
    expect(loginLink).toBeInTheDocument();
  });
});
