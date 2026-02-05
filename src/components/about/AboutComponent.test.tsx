import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutComponent from "./AboutComponent";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown> & { alt?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={String(props.alt || "")} />;
  },
}));

describe("<AboutComponent />", () => {
  test("renders the main heading", () => {
    render(<AboutComponent />);
    expect(screen.getByText("Qui suis-je ?")).toBeInTheDocument();
  });

  test("renders Julie's image", () => {
    render(<AboutComponent />);
    const img = screen.getByAltText("Picture of Julie Baronnie");
    expect(img).toBeInTheDocument();
  });

  test("renders introductory paragraph", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(/Comédienne, cinéma, tv ou théâtre/i),
    ).toBeInTheDocument();
  });

  test("renders information about Odysee channel", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(/Je partage ici via les vidéos de ma chaîne Odysee/i),
    ).toBeInTheDocument();
  });

  test("renders information about Acecosm products", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(/utilise uniquement des produits professionnels/i),
    ).toBeInTheDocument();
  });

  test("renders link to Odysee channel", () => {
    render(<AboutComponent />);
    const link = screen.getByRole("link", { name: /chaîne Odysee/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://odysee.com/@JulieBaronnieBeauty:7",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders discount code information", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(/vous avez une remise permanente de 10%/i),
    ).toBeInTheDocument();
  });

  test("renders warning about fake products", () => {
    render(<AboutComponent />);
    expect(screen.getByText(/foirfouille/i)).toBeInTheDocument();
  });

  test("renders medical warning", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(
        /Seuls les médecins sont habilités à injecter sur autrui/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders signature", () => {
    render(<AboutComponent />);
    expect(screen.getByText("Julie Baronnie")).toBeInTheDocument();
  });

  test("renders article tag with proper structure", () => {
    const { container } = render(<AboutComponent />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  test("renders two main sections", () => {
    const { container } = render(<AboutComponent />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBe(2);
  });

  test("renders information about Korean products", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(/Les coréens sont précurseurs en la matière/i),
    ).toBeInTheDocument();
  });

  test("renders disclaimer about sharing practices", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(
        /Je partage ce que je fais et en aucun cas je ne vous incite/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders warning about unlicensed practitioners", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(
        /n'allez jamais vous faire injecter chez des personnes/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders closing statement", () => {
    render(<AboutComponent />);
    expect(
      screen.getByText(/Ma peau est comme une toile/i),
    ).toBeInTheDocument();
  });

  test("image has correct dimensions", () => {
    render(<AboutComponent />);
    const img = screen.getByAltText("Picture of Julie Baronnie");
    expect(img).toHaveAttribute("width", "700");
    expect(img).toHaveAttribute("height", "800");
  });
});
