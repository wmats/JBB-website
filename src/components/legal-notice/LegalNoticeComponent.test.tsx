import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LegalNoticeComponent from "./LegalNoticeComponent";

describe("<LegalNoticeComponent />", () => {
  test("renders main heading", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText("Mentions Légales")).toBeInTheDocument();
  });

  test("renders Responsables section heading", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText("Responsables")).toBeInTheDocument();
  });

  test("renders responsible person information", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/Responsable de la publication : Julie Baronnie/i)
    ).toBeInTheDocument();
  });

  test("renders Hébergement section heading", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText("Hébergement")).toBeInTheDocument();
  });

  test("renders hosting information", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText(/Ce site est hébergé par Vercel.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Vercel Inc./i)).toBeInTheDocument();
  });

  test("renders Licence section heading", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText("Licence")).toBeInTheDocument();
  });

  test("renders license information", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/Sauf mention contraire, tous les textes de ce site/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Creative Commons Attribution/i)).toBeInTheDocument();
  });

  test("renders Données personnelles section heading", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText("Données personnelles")).toBeInTheDocument();
  });

  test("renders personal data information", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/Les informations que vous nous communiquez/i)
    ).toBeInTheDocument();
  });

  test("renders contact email", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText(/contact@juliebaronniebeauty.com/i)).toBeInTheDocument();
  });

  test("renders Commentaires section heading", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText("Commentaires")).toBeInTheDocument();
  });

  test("renders comments policy", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/espace des commentaires/i)
    ).toBeInTheDocument();
  });

  test("renders Cookies section heading", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText("Cookies")).toBeInTheDocument();
  });

  test("renders cookies information", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/cookie non détruit/i)
    ).toBeInTheDocument();
  });

  test("renders browser-specific cookie instructions", () => {
    render(<LegalNoticeComponent />);
    expect(screen.getByText(/Sous Internet Explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/Sous Firefox/i)).toBeInTheDocument();
    expect(screen.getByText(/Sous Chrome/i)).toBeInTheDocument();
  });

  test("renders section tag with proper structure", () => {
    const { container } = render(<LegalNoticeComponent />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  test("renders list of browser instructions", () => {
    const { container } = render(<LegalNoticeComponent />);
    const list = container.querySelector("ul");
    expect(list).toBeInTheDocument();
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(3); // Three browsers listed
  });

  test("renders all four subheadings", () => {
    const { container } = render(<LegalNoticeComponent />);
    const headings = container.querySelectorAll("h4");
    expect(headings.length).toBe(6); // Responsables, Hébergement, Licence, Données personnelles, Commentaires, Cookies
  });

  test("renders GDPR rights information", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/de rectification/i)
    ).toBeInTheDocument();
  });

  test("renders moderation policy", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/appliquer une modération/i)
    ).toBeInTheDocument();
  });

  test("renders analytics information", () => {
    render(<LegalNoticeComponent />);
    expect(
      screen.getByText(/fréquentation de notre site/i)
    ).toBeInTheDocument();
  });
});
