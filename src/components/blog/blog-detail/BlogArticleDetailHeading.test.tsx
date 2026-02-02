import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { renderWithChakra } from "../../../test-utils";
import BlogArticleDetailHeading from "./BlogArticleDetailHeading";

describe("<BlogArticleDetailHeading />", () => {
  test("renders Blog heading", () => {
    renderWithChakra(<BlogArticleDetailHeading title="Test Article" />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  test("renders article title in breadcrumb", () => {
    renderWithChakra(<BlogArticleDetailHeading title="My Test Article" />);
    expect(screen.getByText("My Test Article")).toBeInTheDocument();
  });

  test("renders Articles breadcrumb link", () => {
    renderWithChakra(<BlogArticleDetailHeading title="Test" />);
    expect(screen.getByText("Articles")).toBeInTheDocument();
  });

  test("renders home icon link", () => {
    renderWithChakra(<BlogArticleDetailHeading title="Test" />);
    const links = screen.getAllByRole("link");
    const homeLink = links.find((link) => link.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });

  test("renders blog breadcrumb link", () => {
    renderWithChakra(<BlogArticleDetailHeading title="Test" />);
    const links = screen.getAllByRole("link");
    const blogLink = links.find((link) => link.getAttribute("href") === "/blog");
    expect(blogLink).toBeInTheDocument();
  });
});
