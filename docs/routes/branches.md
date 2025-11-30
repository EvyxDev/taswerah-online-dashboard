# Branches Route Documentation

## Route Path

`/[locale]/(dashboard)/branches`

## Overview

The branches route allows administrators to view, create, edit, and delete branches. It displays a table of all branches with their credentials (admin email/password, manager email/password, and tokens). Users can copy credentials to clipboard and manage branches through dialogs.

---

## Components Used

### Main Components

1. **`page.tsx`** (Server Component)

   - Entry point for the branches route
   - Handles server-side data fetching
   - Processes URL search parameters (search)
   - Fetches branches data

2. **`branshes-page.tsx`** (Client Component)

   - Main UI component that displays the branches interface
   - Handles breadcrumb navigation
   - Renders the branches table component

3. **`branshes-table.tsx`** (Client Component)

   - Displays branches in a table format
   - Shows branch ID, name, admin credentials, manager credentials, and token
   - Provides copy-to-clipboard functionality
   - Manages dialog state for add/edit

### Dialog Components

4. **`add-branch-dialog.tsx`**

   - Dialog for creating new branches
   - Contains form with branch details
   - Triggers branch creation action

5. **`add-bransh-form.tsx`**

   - Form component for branch creation/editing
   - Contains fields for name, admin email/password, manager email/password
   - Validates form data before submission

---

## Flow

### 1. Page Load Flow

```
User navigates to /branches
    ↓
page.tsx (Server Component) receives request
    ↓
Extracts searchParams (search)
    ↓
Gets authentication token
    ↓
Calls GetAllBranshes(token)
    ↓
Filters branches by search term (if provided)
    ↓
Passes filtered data to BranshesPage component
    ↓
BranshesPage renders BranshesTable with branches
    ↓
BranshesTable displays branches in table
```

### 2. Create Branch Flow

```
User clicks Create button (+ icon)
    ↓
AddOrEditBranchDialog opens
    ↓
AddorEditBranshForm is rendered
    ↓
User enters branch name, admin email/password, manager email/password
    ↓
User clicks Save button
    ↓
Form validates data
    ↓
Calls AddBransh() from useCreateBransh hook
    ↓
Hook calls createBransh() server action
    ↓
Server action makes POST request to API
    ↓
On success: Shows success toast, closes dialog, refreshes page
    ↓
UI updates with new branch
```

### 3. Edit Branch Flow

```
User clicks Edit button on a branch
    ↓
AddOrEditBranchDialog opens in edit mode
    ↓
Form is pre-filled with branch data
    ↓
User modifies branch name
    ↓
User clicks Save button
    ↓
Calls EditBransh() from useEditBransh hook
    ↓
Hook calls editBransh() server action
    ↓
Server action makes PUT request to API
    ↓
On success: Shows success toast, closes dialog, refreshes page
    ↓
UI updates with modified branch
```

### 4. Delete Branch Flow

```
User clicks Delete button on a branch
    ↓
DeleteDialog opens with confirmation
    ↓
User confirms deletion
    ↓
Calls DeleteBransh() from useDeleteBransh hook
    ↓
Hook calls deleteBransh() server action
    ↓
Server action makes DELETE request to API
    ↓
On success: Shows success toast, refreshes page
    ↓
UI updates (branch removed from list)
```

### 5. Copy to Clipboard Flow

```
User clicks copy icon next to a credential
    ↓
copyToClipboard(text, itemId) is called
    ↓
Copies text to clipboard using navigator.clipboard
    ↓
Updates copiedItems state
    ↓
Icon changes to checkmark
    ↓
After 2 seconds, icon reverts to copy icon
```

---

## Actions

### Server Actions

#### 1. `createBransh(data)`

**Location:** `actions/create-bransh.ts`

**Purpose:** Creates a new branch

**Parameters:**

- `data` (CreateBranchBody): Object containing:
  - `name`: Branch name
  - `adminEmail`: Admin email
  - `adminPassword`: Admin password
  - `branchManagerEmail`: Branch manager email
  - `branchManagerPassword`: Branch manager password

**Process:**

1. Gets authentication token
2. Makes POST request to `/branches`
3. Sends JSON body with branch data
4. Revalidates `/branches` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** POST
- **URL:** `${NEXT_PUBLIC_API}/branches`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body:** `{ name: string, is_active: true, admin_email: string, admin_password: string, manager_email: string, manager_password: string }`

#### 2. `editBransh(data, id)`

**Location:** `actions/edit.bransh.ts`

**Purpose:** Updates an existing branch

**Parameters:**

- `data` (CreateBranchBody): Object containing branch name
- `id` (string): Branch ID

**Process:**

1. Gets authentication token
2. Makes PUT request to `/branches/{id}`
3. Sends JSON body with name and is_active
4. Revalidates `/branches` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** PUT
- **URL:** `${NEXT_PUBLIC_API}/branches/{id}`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body:** `{ name: string, is_active: true }`

#### 3. `deleteBransh(id)`

**Location:** `actions/delete-bransh.ts`

**Purpose:** Deletes a branch

**Parameters:**

- `id` (string): Branch ID

**Process:**

1. Gets authentication token
2. Makes DELETE request to `/branches/{id}`
3. Revalidates `/branches` path to refresh data
4. Returns API response

**API Endpoint:**

- **Method:** DELETE
- **URL:** `${NEXT_PUBLIC_API}/branches/{id}`
- **Headers:**
  - `Authorization: Bearer {token}`

---

## Hooks

### 1. `useCreateBransh()`

**Location:** `_hooks/use-create-bransh.ts`

**Returns:**

- `AddBransh`: Mutation function to create branch
- `AddPending`: Boolean indicating if creation is in progress
- `AddError`: Error object if creation fails

**Usage:**

```typescript
const { AddBransh, AddPending } = useCreateBransh();

AddBransh(
  {
    name: "Branch Name",
    adminEmail: "admin@example.com",
    adminPassword: "password",
    branchManagerEmail: "manager@example.com",
    branchManagerPassword: "password",
  },
  {
    onSuccess: () => {
      /* handle success */
    },
    onError: (error) => {
      /* handle error */
    },
  }
);
```

### 2. `useEditBransh()`

**Location:** `_hooks/use-edit-bransh.ts`

**Returns:**

- `EditBransh`: Mutation function to update branch
- `EditPending`: Boolean indicating if update is in progress
- `EditError`: Error object if update fails

**Usage:**

```typescript
const { EditBransh, EditPending } = useEditBransh();

EditBransh(
  {
    id: "123",
    data: { name: "Updated Branch Name" },
  },
  {
    onSuccess: () => {
      /* handle success */
    },
    onError: (error) => {
      /* handle error */
    },
  }
);
```

### 3. `useDeleteBransh()`

**Location:** `_hooks/use-delete-bransh.ts`

**Returns:**

- `DeleteBransh`: Mutation function to delete branch
- `DeletePending`: Boolean indicating if deletion is in progress
- `DeleteError`: Error object if deletion fails

**Usage:**

```typescript
const { DeleteBransh, DeletePending } = useDeleteBransh();

DeleteBransh("123", {
  onSuccess: () => {
    /* handle success */
  },
  onError: (error) => {
    /* handle error */
  },
});
```

---

## GET Requests

### `GetAllBranshes(token: string)`

**Location:** `src/lib/api/branches.api.ts`

**Purpose:** Fetches all branches

**Parameters:**

- `token` (string): Authentication token

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/branches`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`

**Response Structure:**

- Array of branch objects containing:
  - `id`: Branch ID
  - `name`: Branch name
  - `admin_email`: Admin email
  - `admin_password`: Admin password
  - `manager_email`: Branch manager email
  - `manager_password`: Branch manager password
  - `token`: Branch token (can be null)
  - Other branch properties

---

## What is Done in This Route

### 1. **Data Display**

- Displays branches in a table format with columns:
  - **ID**: Branch ID
  - **Name**: Branch name with icon
  - **Admin Email**: Admin email with copy button
  - **Admin Password**: Admin password with copy button (truncated)
  - **Branch Manager Email**: Manager email with copy button
  - **Branch Manager Password**: Manager password with copy button (truncated)
  - **Token**: Branch token with copy button (truncated, shows "-" if null)
- Shows count badge with total number of branches
- Alternating row colors for better readability
- Text truncation for long values

### 2. **Branch Creation**

- Provides dialog interface to create new branches
- Form fields:
  - Branch name (required)
  - Admin email (required)
  - Admin password (required)
  - Branch manager email (required)
  - Branch manager password (required)
- Validates form data before submission
- Shows loading state during creation
- Displays success/error toast notifications
- Automatically refreshes data after successful creation

### 3. **Branch Update**

- Provides dialog interface to edit existing branches
- Pre-fills form with current branch data
- Only allows editing branch name
- Shows loading state during update
- Displays success/error toast notifications
- Automatically refreshes data after successful update

### 4. **Branch Deletion**

- Provides delete button for each branch
- Shows confirmation dialog before deletion
- Shows loading state during deletion
- Displays success/error toast notifications
- Automatically refreshes data after successful deletion
- Removes deleted branch from the list

### 5. **Copy to Clipboard**

- Provides copy button next to each credential field
- Copies text to clipboard using browser API
- Shows visual feedback (checkmark icon) when copied
- Auto-resets after 2 seconds
- Handles copy errors gracefully

### 6. **Search Functionality**

- Supports client-side search by branch name
- Search is case-insensitive
- Filters branches in real-time
- Search parameter is maintained in URL

### 7. **Error Handling**

- Handles API errors gracefully
- Shows user-friendly error messages via toast notifications
- Displays empty state when no branches exist
- Handles network errors

---

## File Structure

```
branches/
├── page.tsx                          # Server component - entry point
├── _components/
│   ├── branshes-page.tsx            # Main page component
│   ├── branshes-table.tsx           # Branches table component
│   ├── add-branch-dialog.tsx        # Add/edit dialog
│   └── add-bransh-form.tsx          # Branch form component
├── _hooks/
│   ├── use-create-bransh.ts         # Create branch hook
│   ├── use-edit-bransh.ts           # Edit branch hook
│   └── use-delete-bransh.ts         # Delete branch hook
└── actions/
    ├── create-bransh.ts             # Create branch server action
    ├── edit.bransh.ts               # Edit branch server action
    └── delete-bransh.ts             # Delete branch server action
```
