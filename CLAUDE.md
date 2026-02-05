# JBB Site

A modern blog and content platform built with Next.js, featuring full-text search, authentication, and a headless CMS integration.

## Features

- Server-side rendered blog with dynamic routing
- Full-text search powered by Algolia
- User authentication with NextAuth.js
- Headless CMS integration (Strapi)
- Responsive UI with Chakra UI
- Markdown content rendering
- Social sharing capabilities
- Google Analytics integration
- Comprehensive testing setup (Vitest + Cypress)

## Tech Stack

- **Framework**: Next.js 15
- **UI Library**: Chakra UI + Emotion
- **Authentication**: NextAuth.js
- **Search**: Algolia
- **CMS**: Strapi (headless)
- **HTTP Client**: Axios + SWR
- **Markdown**: react-markdown with remark-gfm
- **Testing**: Vitest (unit) + Cypress (E2E)
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 20.17.x and <= 22.14.0
- **npm** or **yarn** package manager
- **Git**

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jbb-site
```

2. Install dependencies:
```bash
npm install
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Algolia Search Configuration
NEXT_PUBLIC_ALGOLIA_ARTICLES_INDEX_NAME=your_articles_index_name
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_search_api_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Strapi CMS API Configuration
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_API_TOKEN=your_strapi_api_token

# Google Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=your_ga_tracking_id
```

> **Note**: Never commit the `.env` file to version control. Use `.env.example` as a template for required variables.

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run unit tests with Vitest
- `npm run cypress:open` - Open Cypress test runner
- `npm run cypress:ci` - Run Cypress tests in CI mode

## Testing

### Unit Tests (Vitest)

Run unit tests:

```bash
npm test
```

### End-to-End Tests (Cypress)

Open Cypress test runner:

```bash
npm run cypress:open
```

Run Cypress tests in headless mode:

```bash
npm run cypress:ci
```

## Project Structure

```
jbb-site/
├── src/
│   ├── api/              # API integration layer
│   ├── components/       # React components
│   ├── data/            # Static data and constants
│   ├── hooks/           # Custom React hooks
│   ├── infra/           # Infrastructure utilities
│   ├── lib/             # Shared libraries and utilities
│   ├── pages/           # Next.js pages and routes
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── cypress/             # E2E tests
├── .env                 # Environment variables (not committed)
├── next.config.js       # Next.js configuration
├── cypress.config.ts    # Cypress configuration
├── vitest.config.mts    # Vitest configuration
├── eslint.config.mts    # ESLint configuration
└── package.json         # Project dependencies
```

## Key Features Explained

### Blog System

The blog supports dynamic routing with individual article pages at `/blog/[blogArticleId]`. Articles are fetched from the Strapi CMS and rendered with markdown support.

### Search Functionality

Algolia powers the full-text search across all articles, providing fast and relevant search results with customizable indexing.

### Authentication

NextAuth.js handles user authentication with support for multiple providers and session management.

### Content Management

Strapi CMS serves as the headless backend, providing a REST API for content management and retrieval.

## Development Guidelines

1. **Code Style**: Follow the ESLint and Prettier configurations
2. **Type Safety**: Maintain strict TypeScript typing
3. **Testing**: Write tests for new features and bug fixes
4. **Commits**: Use conventional commit messages
5. **Components**: Keep components small and reusable

## Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill
```

**Build errors**:
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Type errors**:
```bash
# Run type checking
npm run type-check
```

## Contributing

1. Create a feature branch from `master`
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Support

For issues or questions, please open an issue in the repository.

## License

[Add your license information here]
