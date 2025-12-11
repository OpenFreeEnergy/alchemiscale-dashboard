# Alchemiscale Dashboard

A TypeScript client and React-based web interface for the Alchemiscale API, built with Next.js 15 and automatically generated from the OpenAPI specification.

## Features

- **Full TypeScript Support**: Type-safe API client generated from OpenAPI spec
- **Authentication**: JWT token-based authentication with persistent sessions
- **Modern UI**: Built with Next.js 15, React, and Tailwind CSS
- **Auto-generated Client**: API client generated using `openapi-typescript-codegen`

## Project Structure

```
alchemiscale-web/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Home page
│   │   └── dashboard/         # Dashboard page with API demo
│   ├── client/                # Auto-generated TypeScript API client
│   │   ├── core/              # Core client functionality
│   │   ├── models/            # TypeScript type definitions
│   │   ├── services/          # API service methods
│   │   └── index.ts           # Client exports
│   └── lib/                   # Utilities
│       └── alchemiscale-client.ts  # Client configuration helpers
├── devtools/
│   └── openapi/
│       └── openapi.json       # OpenAPI specification
└── export_openapi.py          # Script to regenerate OpenAPI spec
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Access to an Alchemiscale API instance

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your API URL (required):
```env
NEXT_PUBLIC_ALCHEMISCALE_API_URL=https://api.your-instance.com
```

Note: The API URL is required. The application will throw an error if this environment variable is not set.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Using the API Client

The generated TypeScript client can be used in any component:

```typescript
import { DefaultService } from '@/client';
import { configureAlchemiscaleClient, setAuthToken } from '@/lib/alchemiscale-client';

// Configure the client (usually in a useEffect or app initialization)
// The API URL is automatically loaded from NEXT_PUBLIC_ALCHEMISCALE_API_URL
configureAlchemiscaleClient();

// Authenticate
const tokenResponse = await DefaultService.getAccessTokenTokenPost({
  username: 'your-username',
  password: 'your-password',
  grant_type: 'password',
});

setAuthToken(tokenResponse.access_token);

// Make API calls
const apiInfo = await DefaultService.infoInfoGet();
const networks = await DefaultService.listNetworksNetworksGet();
```

### Example: Python vs TypeScript

**Python:**
```python
asc = AlchemiscaleClient(
    'https://api.your-instance.com',
    'your-username',
    'your-password'
)
```

**TypeScript:**
```typescript
// API URL is configured via NEXT_PUBLIC_ALCHEMISCALE_API_URL environment variable
configureAlchemiscaleClient();

const token = await DefaultService.getAccessTokenTokenPost({
  username: 'your-username',
  password: 'your-password',
  grant_type: 'password',
});

setAuthToken(token.access_token);
```

## Regenerating the Client

If the Alchemiscale API changes, you can regenerate the TypeScript client:

1. Export a new OpenAPI spec:
```bash
cd ..  # Go to alchemiscale root
python export_openapi.py
mv openapi.json devtools/openapi/openapi.json
```

2. Regenerate the TypeScript client:
```bash
cd alchemiscale-web
npx openapi-typescript-codegen \
  --input ../devtools/openapi/openapi.json \
  --output ./src/client \
  --client fetch
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

The generated client includes all Alchemiscale API endpoints:

- **Authentication**: `/token`
- **Health**: `/ping`, `/info`, `/check`
- **Networks**: Create, list, manage networks
- **Transformations**: Manage transformations and chemical systems
- **Tasks**: Create, monitor, and manage computational tasks
- **Results**: Retrieve task results and failures
- **Strategies**: Configure execution strategies

See the generated `src/client/services/DefaultService.ts` for all available methods.

## Development

### TypeScript Types

All API responses and request bodies are fully typed. The GUFE (Great Universal Free Energy) types are represented as generic objects in TypeScript since they don't have direct TypeScript equivalents.

### Adding New Pages

Create new pages in `src/app/` using the Next.js App Router:

```typescript
// src/app/networks/page.tsx
'use client';

import { DefaultService } from '@/client';

export default function NetworksPage() {
  // Your component code
}
```

## License

This project follows the same license as the main Alchemiscale project.
