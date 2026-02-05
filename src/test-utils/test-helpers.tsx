import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";

// Custom render with Chakra provider
export function renderWithChakra(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, {
    wrapper: ({ children }) => <ChakraProvider>{children}</ChakraProvider>,
    ...options,
  });
}

// Mock data factories
export const mockBlogPost = (overrides = {}) => ({
  id: 1,
  documentId: "test-doc-id",
  title: "Test Blog Post",
  issueDate: "2024-01-01",
  imageUrl: "/test-image.jpg",
  intro: "Test intro",
  description: "Test description",
  videoUrl: "",
  categories: ["Beauty", "Skincare"],
  ...overrides,
});

export const mockProduct = (overrides = {}) => ({
  id: "1",
  documentId: "test-product-doc",
  name: "Test Product",
  intro: "Test product intro",
  description: "Test product description",
  price: 99.99,
  issueDate: "2024-01-01",
  imageUrl: "/test-product.jpg",
  categories: ["Skincare"],
  ...overrides,
});

export const mockComment = (overrides = {}) => ({
  id: 1,
  documentId: "test-comment-doc",
  ArticleID: 1,
  AuthorID: 1,
  Content: "Test comment content",
  issueDate: "2024-01-01",
  AuthorName: "Test User",
  ...overrides,
});

export const mockSessionUser = (overrides = {}) => ({
  id: 1,
  name: "Test User",
  email: "test@example.com",
  accessToken: "test-token",
  ...overrides,
});
