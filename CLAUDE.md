# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pilcrow is a web-based notepad application similar to Apple Notes, featuring a block-based TipTap editor with slash commands and markdown shortcuts. Built with TanStack Start, TypeScript, Drizzle ORM with SQLite, and BetterAuth for authentication. Deployed on Netlify.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server at localhost:3000
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Checks
npm run lint    # Lint
npm run tsc     # Typecheck

# Pre-commit checks (type check + lint fix)
npm run pre-commit

# Database commands
npm run db:generate    # Generate Drizzle migrations
npm run db:migrate     # Run migrations
npm run db:studio      # Open Drizzle Studio
```

## Architecture Overview

### Core Structure

- **TanStack Start** (`/app`): File-based routing with routes in `/app/routes/`
- **Editor Core** (`/src/components/editor/index.tsx`): TipTap editor initialization with auto-save (750ms debounce) and API persistence
- **Extensions** (`/src/components/editor/extensions/`): Custom TipTap extensions for slash commands, callouts, figures, iframes, notes, strapline, color, and custom keyboard shortcuts
- **Global State** (`/src/context/doc.tsx`): `DocContext` manages document state (title, markdown, docId, lastSaved, notes, sidebar visibility)
- **Data Layer** (`/src/hooks/docs.ts`): `useDocs` hook handles all document API operations (saveDoc, getDoc, getDocs, updateDoc, saveNoteToDoc, newDocument)
- **UI Components** (`/src/components/`): TopBar, Dashboard, Sidebar, Command Palette (Cmd+K), Toolbar, Notes Panel

### TanStack Start Router

Routes are defined in `/app/routes/`:

- **`__root.tsx`**: Root layout with HTML structure and global styles
- **`_authenticated.tsx`**: Protected route layout requiring authentication
- **`_authenticated/index.tsx`**: Main editor page (authenticated)
- **`login.tsx`**: Login page
- **`signup.tsx`**: Signup page
- **`api/auth/$.ts`**: BetterAuth API endpoint (handles all auth requests)
- **`api/documents/`**: Document CRUD API routes
  - `index.ts`: GET all documents, POST new document
  - `$id.ts`: GET/PUT/DELETE specific document
  - `$id/notes.ts`: GET/POST notes for a document

### TipTap Editor Integration

The editor (`/src/components/editor/index.tsx`) implements:

- **Extension Registry**: `/src/components/editor/extensions/index.ts` loads all TipTap extensions (core, pro, and custom)
- **Auto-Save**: `handleOnSave` debounced at 750ms, saves via API with title extraction from first H1
- **Content Loading**: Fetches document from API on `docId` change, sets content as TipTap JSON

### Custom Extensions

Key custom extensions in `/src/components/editor/extensions/`:

- **slash-command/**: Command menu triggered by "/" with 10+ commands (formatting, media embeds)
- **callout.ts**: Notion-style highlighted information boxes
- **figure.ts**: Images with captions, supports markdown image syntax
- **iframe.ts**: Embeds for YouTube, Figma, Loom with auto-URL conversion
- **note.ts**: Text annotation system with side panel integration
- **strapline.ts**: Subtitle/descriptive text element
- **color.ts**: Text color support (20+ colors with dark mode)
- **codeblock.tsx**: Syntax highlighting via lowlight library
- **emoji/**: Emoji picker triggered by ":"

### Data Persistence

**Database** (`/src/db/`):

- **Driver**: SQLite via better-sqlite3 (development) or Turso via @libsql/client (production)
- **ORM**: Drizzle ORM
- **Schema** (`schema.ts`): Users, sessions, accounts, verifications (BetterAuth), documents, notes
- **Client** (`index.ts`): Drizzle database instance that automatically switches between local SQLite and Turso based on NODE_ENV

**Database Schema**:

```typescript
// BetterAuth tables
user: { id, name, email, emailVerified, image, createdAt, updatedAt }
session: { id, expiresAt, token, userId, ipAddress, userAgent, ... }
account: { id, accountId, providerId, userId, password, ... }
verification: { id, identifier, value, expiresAt, ... }

// Application tables
document: { id, title, content (JSON), userId, createdAt, updatedAt }
note: { id, content, documentId, createdAt }
```

**useDocs Hook** (`/src/hooks/docs.ts`):

- `saveDoc`: Create or update document via API
- `getDoc`: Fetch single document by ID
- `getDocs`: Fetch all user documents
- `updateDoc`: Update existing document
- `saveNoteToDoc`: Add note to document
- `newDocument`: Create new document with generated ID, reset state

**LocalStorage**:

- `recent_doc`: Last accessed document ID for quick reload

### Authentication

**BetterAuth** (`/src/lib/auth.ts`):

- Email/Password authentication enabled
- SQLite database adapter via Drizzle
- Session management with cookies
- API endpoint: `/api/auth/*`

**Auth Client** (`/src/lib/auth-client.ts`):

- React hooks for authentication: `useSession`, `signIn`, `signOut`, `signUp`
- Client-side auth state management

**Protected Routes**:

- Routes under `_authenticated` layout require valid session
- Redirects to `/login` if unauthenticated

### Component Patterns

**Global Hotkeys**:

- Cmd+K: Command palette
- Cmd+/: Toggle dashboard/sidebar
- Esc: Close modals/panels

**Key Components**:

- **TopBar**: Fixed header with dashboard button, title editor, top menu
- **Dashboard** (`dashboard/index.tsx`): Modal showing all documents from API
- **CommandPalette** (`cmdk/index.tsx`): Multi-page command system, sorts docs by last updated, limits recent docs to 5
- **Toolbar** (`editor/toolbar/`): Floating formatting toolbar on text selection
- **Notes Panel** (`notes/index.tsx`): Side panel for document annotations

## Important Utilities

**Editor Utilities** (`/src/utils/editor.ts`):

- `getAllText`, `getPreviousText`, `getSelectedText`: Text extraction helpers
- `getTitleFromJson`: Extract title from TipTap JSON (first H1)
- `stripTitleFromContent`: Remove title from HTML content
- `getEmbedUrl`: Convert URLs to embed format (YouTube, Figma, Loom)

**Type Definitions** (`/src/utils/types.ts`):

```typescript
type Doc = {
  id: string;
  title: string;
  content: JSONContent; // TipTap JSON format
  created_at: string | Date;
  last_updated_at: string | Date;
  notes: Array<Note> | [];
};

type Note = {
  id: string;
  content: string;
  created_at?: string;
};
```

## Adding New Features

**New Slash Commands**: Add to `/src/components/editor/extensions/slash-command/suggestions.tsx` in the `getSuggestionItems` array

**New Block Types**: Create extension in `/src/components/editor/extensions/`, register in `index.ts`

**New Editor Functionality**: Extend TipTap via custom extensions or commands

**New UI Components**: Add to `/src/components/`, use Radix UI primitives from `/src/components/ui/`

**New API Routes**: Add to `/app/routes/api/`, use BetterAuth session for authentication

## Configuration

**Path Aliases**: `@/*` maps to `./src/*` (tsconfig.json)

**Tailwind v4**: Configuration via CSS `@theme` directive in `app/globals.css`, dark mode via `[data-theme="dark"]`

**TanStack Start**: Configuration in `app.config.ts`, Netlify preset enabled

**Pre-commit Hooks**: Husky runs TypeScript check and linting before commits

**Deployment**: Netlify with configuration in `netlify.toml`

## Environment Variables

Required environment variables (see `.env.example`):

- `NODE_ENV`: Set to "production" to enable Turso database (automatically set by Netlify)
- `BETTER_AUTH_SECRET`: Secret key for BetterAuth session encryption (generate with `openssl rand -base64 32`)
- `BETTER_AUTH_URL`: Base URL for the application (http://localhost:3000 in dev, production URL in prod)
- `TIPTAP_PRO_TOKEN`: Authentication token for TipTap Pro extensions registry
- `TURSO_DATABASE_URL`: Turso database URL (production only, e.g., libsql://your-database.turso.io)
- `TURSO_AUTH_TOKEN`: Turso authentication token (production only)

Set these in:

- Local development: `.env` file (not committed)
- Netlify: Environment variables in Netlify dashboard

## Database Migrations

To update the database schema:

1. Modify schema in `/src/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`
4. View data: `npm run db:studio`

## Deployment

The app is configured for Netlify deployment with Turso as the production database:

### Setup Turso Database

1. Create a Turso account at [turso.tech](https://turso.tech)
2. Install Turso CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
3. Login: `turso auth login`
4. Create a database: `turso db create pilcrow-editor`
5. Get the database URL: `turso db show pilcrow-editor --url`
6. Create an auth token: `turso db tokens create pilcrow-editor`
7. Run migrations against Turso: `NODE_ENV=production npm run db:migrate`

### Deploy to Netlify

1. Push to Git repository
2. Connect to Netlify
3. Set environment variables in Netlify dashboard:
   - `NODE_ENV`: production
   - `BETTER_AUTH_SECRET`: (generate with `openssl rand -base64 32`)
   - `BETTER_AUTH_URL`: https://your-app.netlify.app
   - `TIPTAP_PRO_TOKEN`: (from TipTap Pro account)
   - `TURSO_DATABASE_URL`: (from step 5 above)
   - `TURSO_AUTH_TOKEN`: (from step 6 above)
4. Build command: `npm run build`
5. Publish directory: `.output/public`

Note: The app automatically uses Turso when `NODE_ENV=production`, and local SQLite in development.
