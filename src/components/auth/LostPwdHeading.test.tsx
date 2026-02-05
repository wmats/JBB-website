import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../test-utils";
import LostPwdHeading from "./LostPwdHeading";

describe("<LostPwdHeading />", () => {
  test("renders Mon compte heading", () => {
    renderWithChakra(<LostPwdHeading />);
    expect(screen.getByText("Mon compte")).toBeInTheDocument();
  });

  test("renders Mot de passe perdu breadcrumb", () => {
    renderWithChakra(<LostPwdHeading />);
    expect(screen.getByText("Mot de passe perdu")).toBeInTheDocument();
  });

  test("renders Connexion breadcrumb link", () => {
    renderWithChakra(<LostPwdHeading />);
    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });

  test("renders home icon link", () => {
    renderWithChakra(<LostPwdHeading />);
    const links = screen.getAllByRole("link");
    const homeLink = links.find((link) => link.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });

  test("renders login link", () => {
    renderWithChakra(<LostPwdHeading />);
    const links = screen.getAllByRole("link");
    const loginLink = links.find(
      (link) => link.getAttribute("href") === "/login",
    );
    expect(loginLink).toBeInTheDocument();
  });
});
