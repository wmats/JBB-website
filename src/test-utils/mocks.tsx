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

export const mockNextRouter = (router: Partial<any> = {}) => {
  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
    route: "/",
    ...router,
  };

  vi.mock("next/router", () => ({
    useRouter: () => mockRouter,
  }));

  return mockRouter;
};

// Chakra UI mocks
export const mockUseMediaQuery = (matches: boolean[] = [true]) => {
  vi.mock("@chakra-ui/react", async () => {
    const actual = await vi.importActual("@chakra-ui/react");
    return {
      ...actual,
      useMediaQuery: () => matches,
    };
  });
};

// NextAuth mocks
export const mockUseSession = (
  session: any = null,
  status: "authenticated" | "unauthenticated" | "loading" = "unauthenticated"
) => {
  vi.mock("next-auth/react", () => ({
    useSession: () => ({ data: session, status }),
    signIn: vi.fn(),
    signOut: vi.fn(),
  }));
};

// Axios mocks
export const mockAxios = () => {
  const axios = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  };

  vi.mock("axios", () => ({
    default: axios,
  }));

  return axios;
};

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
