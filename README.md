# Taswera Online Dashboard

A comprehensive Next.js dashboard application for managing branches, employees, photographers, packages, payments, and system settings. Built with modern React patterns and TypeScript for the online administration panel.

## 🚀 Tech Stack

### Core Framework

- **Next.js 14.2.24** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety

### State Management & Data Fetching

- **@tanstack/react-query 5.68.0** - Server state management and data fetching
- **React Hook Form 7.54.2** - Form state management
- **Zod 3.25.75** - Schema validation

### UI Components & Styling

- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Radix UI** - Headless UI components (Dialog, Select, Dropdown, Tabs, Switch, etc.)
- **Lucide React 0.482.0** - Icon library
- **React Icons 5.5.0** - Additional icon sets
- **Sonner 2.0.6** - Toast notifications
- **shadcn/ui** - Pre-built accessible components

### Internationalization

- **next-intl 4.0.2** - Internationalization for Next.js

### Authentication

- **NextAuth 4.24.11** - Authentication library

### Data Visualization

- **Recharts 3.0.2** - Chart library for React
- **Chart.js 4.5.0** - Chart library
- **react-chartjs-2 5.3.0** - React wrapper for Chart.js

### File Handling

- **xlsx 0.18.5** - Excel file generation

### Drag & Drop

- **@dnd-kit/core 6.3.1** - Drag and drop functionality
- **@dnd-kit/sortable 10.0.0** - Sortable lists
- **@dnd-kit/utilities 3.2.2** - DnD utilities

### Utilities

- **class-variance-authority 0.7.1** - Component variants
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 3.0.2** - Merge Tailwind classes
- **nuqs 2.4.3** - URL search params management
- **next-themes 0.4.6** - Theme management

## 📁 Project Structure

```
taswerah-online-dashboard/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Internationalization route group
│   │   │   ├── (dashboard)/          # Dashboard route group
│   │   │   │   ├── page.tsx          # Dashboard home
│   │   │   │   ├── branches/         # Branches management
│   │   │   │   ├── employees/        # Employees & photographers
│   │   │   │   ├── packages/         # Packages management
│   │   │   │   ├── payments/         # Payments dashboard
│   │   │   │   ├── settings/         # Settings (frames & stickers)
│   │   │   │   ├── _components/      # Shared dashboard components
│   │   │   │   ├── _hooks/           # Shared dashboard hooks
│   │   │   │   └── actions/          # Shared server actions
│   │   │   ├── auth/                 # Authentication routes
│   │   │   └── layout.tsx           # Root layout
│   │   └── api/                      # API routes
│   ├── components/                   # Reusable components
│   │   ├── common/                   # Common components
│   │   ├── features/                 # Feature-specific components
│   │   ├── layout/                   # Layout components
│   │   ├── providers/                # Context providers
│   │   ├── skeletons/                # Loading skeletons
│   │   └── ui/                       # UI primitives (shadcn/ui)
│   ├── lib/                          # Utilities and configurations
│   │   ├── api/                      # API client functions
│   │   ├── constants/                # Constants
│   │   ├── schemes/                  # Validation schemes
│   │   ├── types/                    # TypeScript types
│   │   └── utils/                    # Utility functions
│   ├── i18n/                         # Internationalization
│   │   ├── messages/                 # Translation files
│   │   ├── request.ts                # i18n request handler
│   │   └── routing.ts                # i18n routing config
│   └── middleware.ts                 # Next.js middleware
├── docs/                             # Documentation
│   └── routes/                       # Route documentation
│       ├── dashboard.md
│       ├── branches.md
│       ├── employees.md
│       ├── packages.md
│       ├── payments.md
│       └── settings.md
├── public/                           # Static assets
└── package.json                      # Dependencies
```

## 🗂️ Route Folder Structure

Each route in the dashboard follows a consistent structure for maintainability and scalability:

```
route-name/
├── page.tsx                    # Server component - entry point
├── _components/                # Route-specific components
│   ├── route-page.tsx         # Main page component
│   ├── route-table.tsx        # Table component (if applicable)
│   └── *.tsx                  # Other components
├── _actions/                   # Server actions (Next.js 14)
│   └── *.ts                    # Server action functions
└── _hooks/                     # Custom React hooks
    └── *.ts                    # Hook functions
```

### Route Structure Explanation

1. **`page.tsx`** - Server Component that:

   - Fetches data on the server
   - Handles URL search parameters
   - Passes data to client components

2. **`_components/`** - Client Components that:

   - Handle user interactions
   - Manage local state
   - Render UI

3. **`_actions/`** - Server Actions that:

   - Perform server-side mutations
   - Handle form submissions
   - Revalidate paths after mutations

4. **`_hooks/`** - Custom Hooks that:

   - Encapsulate React Query mutations
   - Provide reusable logic
   - Handle loading and error states

## 📚 Available Routes

### 1. **Dashboard** (`/`)

- View sync jobs statistics and overview
- Display summary cards (total jobs, pay amount, photos, success rate)
- View branches last sync times
- View recent sync jobs table
- Delete sync jobs

**Documentation:** [`docs/routes/dashboard.md`](docs/routes/dashboard.md)

### 2. **Branches** (`/branches`)

- View all branches with credentials
- Create new branches with admin and manager credentials
- Edit branch information
- Delete branches
- Copy branch credentials to clipboard

**Documentation:** [`docs/routes/branches.md`](docs/routes/branches.md)

### 3. **Employees** (`/employees`)

- View employees and photographers in separate tabs
- Create new employees with email, phone, and branch assignment
- Create new photographers with branch assignment
- Edit employee and photographer information
- Toggle active/inactive status
- Delete employees and photographers
- Pagination and search functionality

**Documentation:** [`docs/routes/employees.md`](docs/routes/employees.md)

### 4. **Packages** (`/packages`)

- View all packages in a table
- Display package details (name, photos, price, branch, description)
- Add new packages (UI ready, submission pending)

**Documentation:** [`docs/routes/packages.md`](docs/routes/packages.md)

### 5. **Payments** (`/payments`)

- View payment statistics for selected branch
- Display summary cards (total jobs, pay amount, photos, success rate)
- View sync jobs table for branch
- Filter and export sync jobs data
- Export filtered data to Excel
- Branch selection dropdown

**Documentation:** [`docs/routes/payments.md`](docs/routes/payments.md)

### 6. **Settings** (`/settings`)

- Upload frame images
- Upload sticker images
- View frames gallery
- View stickers gallery
- Manage media assets

**Documentation:** [`docs/routes/settings.md`](docs/routes/settings.md)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. **Install Yarn globally** (if not already installed):

```bash
npm i -g yarn
```

2. **Delete package-lock.json** (if it exists):

```bash
rm package-lock.json
```

3. **Install dependencies**:

```bash
yarn install
```

4. **Set up environment variables**:

   Create a `.env.local` file with:

```env
NEXT_PUBLIC_API=your_api_url
API=your_api_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

5. **Run the development server**:

```bash
yarn dev
```

6. **Open your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Code Organization Guidelines

Please ensure that code in **hooks** and **components** is consistently organized in the following order:

1. **Translation** – Import and define any translation-related logic
2. **Navigation** – Define any navigation-related logic or hooks
3. **State** – Declare local or global state variables
4. **Context** – Use context providers and consumers
5. **Hooks** – Call custom and built-in React hooks
6. **Ref** – Declare and manage `ref` objects
7. **Queries** – Handle data fetching queries (e.g., using React Query)
8. **Mutation** – Handle data mutation logic (e.g., using React Query)
9. **Form & Validation** – Set up form state and validation (e.g., using `react-hook-form`, `zod`)
10. **Variables** – Define any constants or variables (flexible based on context)
11. **Functions** – Define utility functions or component-specific functions
12. **Effects** – Use `useEffect` or similar side-effect hooks at the end

Following this order helps maintain code consistency, improves readability, and makes it easier to debug and scale the project.

## 🔐 Authentication

The application uses NextAuth.js for authentication. Authentication is handled through:

- Session management
- Token-based API authentication
- Protected routes via middleware

## 🌐 Internationalization

The application supports multiple languages using `next-intl`:

- English (en)
- Arabic (ar)

Translation files are located in `src/i18n/messages/`.

## 📊 Data Fetching Patterns

### Server Components

- Used for initial data fetching
- Run on the server
- No client-side JavaScript needed

### Client Components

- Used for interactive UI
- Use React Query for data fetching
- Handle mutations and real-time updates

### Server Actions

- Used for form submissions
- Run on the server
- Automatically revalidate paths after mutations

## 🎨 UI Components

The project uses a combination of:

- **shadcn/ui** - Pre-built accessible components
- **Radix UI** - Headless UI primitives
- **Custom components** - Route-specific components

All UI components are located in `src/components/ui/` and follow the shadcn/ui pattern.

## 📦 Build & Deployment

### Build for production:

```bash
yarn build
```

### Start production server:

```bash
yarn start
```

The application is configured for standalone output, making it suitable for containerized deployments.

## 📖 Documentation

Detailed documentation for each route is available in the `docs/routes/` directory:

- [Dashboard Route](docs/routes/dashboard.md)
- [Branches Route](docs/routes/branches.md)
- [Employees Route](docs/routes/employees.md)
- [Packages Route](docs/routes/packages.md)
- [Payments Route](docs/routes/payments.md)
- [Settings Route](docs/routes/settings.md)

Each documentation file includes:

- Route path and overview
- Components used
- Flow diagrams
- Actions and hooks
- API endpoints
- Functionality breakdown
- File structure

## 🔧 Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Please follow the code organization guidelines and maintain consistency with the existing codebase structure.
