# Default: list available recipes
default:
    @just --list

# Install npm dependencies
install:
    npm install

# Start development server
dev:
    npm run dev

# Production build
build:
    npm run build

# Start production server
start:
    npm run start

# Run ESLint
lint:
    npm run lint

# Type-check without emitting
typecheck:
    npx tsc --noEmit

# Regenerate TypeScript API client from OpenAPI spec
generate-client openapi_json="../devtools/openapi/openapi.json":
    npx openapi-typescript-codegen --input {{ openapi_json }} --output ./src/client --client fetch
