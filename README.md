This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A responsive community board frontend built with Next.js, allowing users to post questions, share insights, and engage in discussions.

## Features

### User Management

- [x] Username-based authentication
- [x] Simplified login (no email verification)
- [x] Basic user management

### Content Management

- [x] Browse and view all community posts
- [x] Create new discussion topics
- [x] Full CRUD operations for posts

### Comment System

- [x] Linear comment structure (no nesting)
- [x] User-specific permissions
- [x] Edit/Delete capabilities for own content

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.17 or higher)
- npm, yarn, pnpm, or bun package manager

## Tech Stack & Packages

### Core Technologies

- [Next.js 14](https://nextjs.org/) - React Framework
- [React 18](https://reactjs.org/) - JavaScript Library
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js

### UI & Styling

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Geist Font](https://vercel.com/font) - Vercel's Font Family

### Development Tools

- [ESLint](https://eslint.org/) - Code Linting
- [Prettier](https://prettier.io/) - Code Formatting

### Package Manager

- npm/yarn/pnpm/bun - Choose your preferred package manager

### Key Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.344.0",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "next-auth": "^5.0.0-beta.3",
    "@auth/core": "^0.18.0"
  },
  "devDependencies": {
    "typescript": "5.x",
    "tailwindcss": "3.x",
    "@types/react": "18.x",
    "@types/node": "20.x",
    "eslint": "8.x",
    "eslint-config-next": "14.x"
  }
}
```

## Setup

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd <your-project-name>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

## Environment Variables

Create a `.env.local` file in the root directory of your project:

```bash
# API Endpoint
NEXT_PUBLIC_API_ENDPOINT=
# Authentication
NEXTAUTH_SECRET=your-secret-key-here # Generate using: openssl rand -base64 32
NEXTAUTH_URL= # Callback URL (e.g. http://localhost:3000)
```

## Running the Project

1. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
