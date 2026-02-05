import { describe, test, expect } from "vitest";
import { urlStringFormatter, newDate } from "./index";

describe("urlStringFormatter", () => {
  test("formats title with documentId", () => {
    expect(urlStringFormatter("Test Title", "doc123")).toBe(
      "test-title-doc123",
    );
  });

  test("handles special characters", () => {
    expect(urlStringFormatter("Café & Crème!", "doc123")).toBe(
      "cafe-creme-doc123",
    );
  });

  test("handles multiple spaces", () => {
    expect(urlStringFormatter("Test  Multiple   Spaces", "doc123")).toBe(
      "test-multiple-spaces-doc123",
    );
  });

  test("removes leading and trailing dashes", () => {
    expect(urlStringFormatter("- Test -", "doc123")).toBe("test-doc123");
  });

  test("handles accented characters", () => {
    expect(urlStringFormatter("Éléphant Français", "doc123")).toBe(
      "elephant-francais-doc123",
    );
  });

  test("handles French accents correctly", () => {
    expect(urlStringFormatter("Beauté Naturelle à Paris", "doc456")).toBe(
      "beaute-naturelle-a-paris-doc456",
    );
  });

  test("collapses multiple dashes", () => {
    expect(urlStringFormatter("Test---Multiple---Dashes", "doc789")).toBe(
      "test-multiple-dashes-doc789",
    );
  });

  test("handles empty string", () => {
    expect(urlStringFormatter("", "doc123")).toBe("-doc123");
  });

  test("handles numbers in title", () => {
    expect(urlStringFormatter("Test 123 Article", "doc456")).toBe(
      "test-123-article-doc456",
    );
  });

  test("removes parentheses and brackets", () => {
    expect(urlStringFormatter("Test (2024) [Updated]", "doc999")).toBe(
      "test-2024-updated-doc999",
    );
  });
});

describe("newDate", () => {
  test("formats date correctly for January", () => {
    expect(newDate("2024-01-15")).toBe("15 Janvier 2024");
  });

  test("formats date correctly for February", () => {
    expect(newDate("2024-02-28")).toBe("28 Février 2024");
  });

  test("formats date correctly for March", () => {
    expect(newDate("2024-03-10")).toBe("10 Mars 2024");
  });

  test("formats date correctly for April", () => {
    expect(newDate("2024-04-05")).toBe("5 Avril 2024");
  });

  test("formats date correctly for May", () => {
    expect(newDate("2024-05-20")).toBe("20 Mai 2024");
  });

  test("formats date correctly for June", () => {
    expect(newDate("2024-06-15")).toBe("15 Juin 2024");
  });

  test("formats date correctly for July", () => {
    expect(newDate("2024-07-25")).toBe("25 Juillet 2024");
  });

  test("formats date correctly for August", () => {
    expect(newDate("2024-08-30")).toBe("30 Août 2024");
  });

  test("formats date correctly for September", () => {
    expect(newDate("2024-09-12")).toBe("12 Septembre 2024");
  });

  test("formats date correctly for October", () => {
    expect(newDate("2024-10-18")).toBe("18 Octobre 2024");
  });

  test("formats date correctly for November", () => {
    expect(newDate("2024-11-22")).toBe("22 Novembre 2024");
  });

  test("formats date correctly for December", () => {
    expect(newDate("2024-12-31")).toBe("31 Décembre 2024");
  });

  test("handles single digit days", () => {
    expect(newDate("2024-06-05")).toBe("5 Juin 2024");
  });

  test("handles different years", () => {
    expect(newDate("2023-03-15")).toBe("15 Mars 2023");
    expect(newDate("2025-07-20")).toBe("20 Juillet 2025");
  });
});
