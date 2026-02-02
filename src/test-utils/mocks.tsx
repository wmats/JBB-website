import { vi } from "vitest";
import { ReactNode } from "react";

// Next.js mocks
export const mockNextLink = () => {
  vi.mock("next/link", () => ({
    default: ({ children, href }: { children: ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    ),
  }));
};

export const mockNextImage = () => {
  vi.mock("next/image", () => ({
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} alt={props.alt || ""} />;
    },
  }));
};

// Removed mockNextRouter - mock next/router directly in test files
// Example:
// vi.mock("next/router", () => ({
//   useRouter: () => ({
//     push: vi.fn(),
//     replace: vi.fn(),
//     prefetch: vi.fn(),
//     back: vi.fn(),
//     pathname: "/",
//     query: {},
//     asPath: "/",
//     route: "/",
//   }),
// }));

// Chakra UI mocks
// Note: Due to how vi.mock works, useMediaQuery should be mocked directly in test files
// Example:
// vi.mock("@chakra-ui/react", async () => {
//   const actual = await vi.importActual("@chakra-ui/react");
//   return { ...actual, useMediaQuery: () => [true] };
// });

// NextAuth mocks
// Note: Mock next-auth directly in test files
// Example:
// vi.mock("next-auth/react", () => ({
//   useSession: () => ({ data: null, status: "unauthenticated" }),
//   signIn: vi.fn(),
//   signOut: vi.fn(),
// }));

// Axios mocks
// Note: Mock axios directly in test files that need it
// Example:
// vi.mock("axios", () => ({
//   default: {
//     get: vi.fn(),
//     post: vi.fn(),
//     put: vi.fn(),
//     delete: vi.fn(),
//   },
// }));

// Algolia mocks
export const mockAlgolia = () => {
  const searchClient = {
    search: vi.fn(),
    searchForFacetValues: vi.fn(),
  };

  vi.mock("algoliasearch", () => ({
    default: vi.fn(() => searchClient),
  }));

  return searchClient;
};

// React InstantSearch mocks
export const mockInstantSearch = () => {
  vi.mock("react-instantsearch-dom", () => ({
    InstantSearch: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    connectSearchBox: (Component: any) => Component,
    connectHits: (Component: any) => Component,
    Highlight: ({ hit, attribute }: any) => <span>{hit[attribute]}</span>,
  }));
};
