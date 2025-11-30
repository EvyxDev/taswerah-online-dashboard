# Packages Route Documentation

## Route Path

`/[locale]/(dashboard)/packages`

## Overview

The packages route displays a list of packages available in the system. Packages are currently loaded from constants and displayed in a table format. Users can view package details including status, name, number of photos, price, branch, and description.

---

## Components Used

### Main Components

1. **`page.tsx`** (Server Component)

   - Entry point for the packages route
   - No server-side data fetching (packages from constants)
   - Renders the packages page component

2. **`packages-page.tsx`** (Client Component)

   - Main UI component that displays the packages interface
   - Handles breadcrumb navigation
   - Renders the packages table component

3. **`packages-table.tsx`** (Client Component)

   - Displays packages in a table format
   - Shows status, name, number of photos, price, branch, and description
   - Provides add package dialog
   - Shows empty state when no packages exist

### Dialog Components

4. **`add-package-dialog.tsx`**

   - Dialog for creating new packages
   - Contains form with package details
   - Includes file upload for package image
   - Currently form only (no submission handler)

---

## Flow

### 1. Page Load Flow

```
User navigates to /packages
    ↓
page.tsx (Server Component) receives request
    ↓
No data fetching required
    ↓
Renders PackagesPage component
    ↓
PackagesPage renders PackagesTable
    ↓
PackagesTable displays packages from constants
```

### 2. Add Package Flow (UI Only - Not Implemented)

```
User clicks Create button (+ icon)
    ↓
AddPackageDialog opens
    ↓
User enters package details (name, photos, price, branch, description)
    ↓
User selects package image
    ↓
Form is displayed (submission not yet implemented)
```

---

## Actions

### Server Actions

No server actions are currently implemented for packages. The add package dialog is present but form submission is not connected.

---

## Hooks

No custom hooks are used in this route.

---

## GET Requests

No GET requests are made in this route. Packages are loaded from constants defined in `src/lib/constants/data.constant.ts`.

---

## What is Done in This Route

### 1. **Data Display**

- Displays packages in a table format with columns:
  - **Status**: Toggle switch (currently non-functional)
  - **Name**: Package name with icon
  - **No. Photos**: Number of photos in package
  - **Price**: Package price
  - **Branch**: Branch name
  - **Description**: Package description (truncated)
- Shows count badge with total number of packages
- Displays empty state when no packages exist
- Alternating row colors for better readability

### 2. **Add Package Dialog**

- Provides dialog interface to add new packages
- Form fields:
  - Name (required)
  - Number of Photos (required, number, min: 1)
  - Price (required, number, min: 0)
  - Branch (required, dropdown selection)
  - Description (required)
  - Image (file upload)
- Form is displayed but submission is not yet implemented

### 3. **Error Handling**

- Displays empty state when no packages exist
- Shows appropriate messages

---

## File Structure

```
packages/
├── page.tsx                          # Server component - entry point
└── _components/
    ├── packages-page.tsx             # Main page component
    ├── packages-table.tsx            # Packages table component
    └── add-package-dialog.tsx        # Add package dialog
```
