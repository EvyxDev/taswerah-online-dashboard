# Employees Route Documentation

## Route Path

`/[locale]/(dashboard)/employees`

## Overview

The employees route allows administrators to view and manage employees and photographers. It displays two separate tables in tabs - one for regular employees and one for photographers. Users can create, edit, delete, and toggle status for both types of staff members.

---

## Components Used

### Main Components

1. **`page.tsx`** (Server Component)

   - Entry point for the employees route
   - Handles server-side data fetching
   - Processes URL search parameters (page, limit, search)
   - Fetches employees and photographers data in parallel

2. **`employees-page.tsx`** (Client Component)

   - Main UI component that displays the employees interface
   - Handles breadcrumb navigation
   - Manages tab state (employees/photographers)
   - Handles pagination and tab switching
   - Renders appropriate table based on active tab

3. **`employees-table.tsx`** (Client Component)

   - Displays regular employees in a table format
   - Shows status, name, email, phone number, branch, and actions
   - Handles toggle status, edit, and delete operations
   - Manages pagination

4. **`photographers-table.tsx`** (Client Component)

   - Displays photographers in a table format
   - Shows status, name, branch, and actions
   - Handles toggle status, edit, and delete operations
   - Manages pagination

### Dialog Components

5. **`add-employee-dialog.tsx`**

   - Dialog for creating or editing employees
   - Contains form with employee details
   - Supports both create and edit modes

6. **`add-employee-form.tsx`**

   - Form component for employee creation/editing
   - Contains fields for name, email, phone, branch selection
   - Validates form data before submission

7. **`add-photographer-dialog.tsx`**

   - Dialog for creating or editing photographers
   - Contains form with photographer details
   - Supports both create and edit modes

8. **`add-or-edit-photographer-form.tsx`**

   - Form component for photographer creation/editing
   - Contains fields for name and branch selection
   - Validates form data before submission

---

## Flow

### 1. Page Load Flow

```
User navigates to /employees
    ↓
page.tsx (Server Component) receives request
    ↓
Extracts searchParams (page, limit, search)
    ↓
Calls GetAllEmployees(page, limit, search)
    ↓
Calls GetAllPhotographers(page, limit, search)
    ↓
Fetches data from APIs in parallel
    ↓
Passes data to EmployeesPage component
    ↓
EmployeesPage renders tabs with EmployeesTable and PhotographersTable
```

### 2. Tab Switch Flow

```
User clicks on Employees or Photographers tab
    ↓
handleTabChange(newTab) is called
    ↓
Sets activeTab state
    ↓
Resets page to 1 in URL
    ↓
Router navigates to new URL
    ↓
page.tsx re-executes with new searchParams
    ↓
Fetches data for selected tab
    ↓
UI updates with appropriate table
```

### 3. Create Employee Flow

```
User clicks Create button
    ↓
AddEmployeeDialog opens
    ↓
User enters employee details (name, email, phone, branch)
    ↓
User clicks Save button
    ↓
Form validates data
    ↓
Calls CreateEmployeer() from useCreateEmployeer hook
    ↓
Hook calls createEmployeer() server action
    ↓
Server action makes POST request to API
    ↓
On success: Shows success toast, closes dialog, refreshes page
    ↓
UI updates with new employee
```

### 4. Toggle Employee Status Flow

```
User toggles status switch on an employee
    ↓
handleToggleStatus(employee) is called
    ↓
Calls toggleStatus() from useToggleEmployeeStatus hook
    ↓
Hook calls toggleEmployeeStatus() server action
    ↓
Server action makes POST/PUT request to API
    ↓
On success: Shows success toast, refreshes page
    ↓
UI updates with new status
```

### 5. Delete Employee Flow

```
User clicks Delete button on an employee
    ↓
DeleteDialog opens with confirmation
    ↓
User confirms deletion
    ↓
Calls DeleteEmployeer() from useDeleteEmployeer hook
    ↓
Hook calls deleteEmployeer() server action
    ↓
Server action makes DELETE request to API
    ↓
On success: Shows success toast, refreshes page
    ↓
UI updates (employee removed from list)
```

---

## Actions

### Server Actions

#### 1. `createEmployeer(data)`

**Location:** `_actions/create-employeer.ts`

**Purpose:** Creates a new employee

**Parameters:**

- `data` (CreateBranchManagerBody): Object containing employee details

**Process:**

1. Gets authentication token
2. Makes POST request to `/onlinedashboard/admin/employees`
3. Sends JSON body with employee data
4. Revalidates `/employees` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** POST
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body:** Employee data object

#### 2. `createPhotographer(data)`

**Location:** `_actions/create-photographer.ts`

**Purpose:** Creates a new photographer

**Parameters:**

- `data`: Object containing photographer details

**Process:**

1. Gets authentication token
2. Makes POST request to photographer endpoint
3. Sends JSON body with photographer data
4. Revalidates `/employees` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** POST
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees/photographers`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body:** Photographer data object

#### 3. `editEmployeer(data, id)`

**Location:** `_actions/edit.employeer.ts`

**Purpose:** Updates an existing employee

**Parameters:**

- `data`: Object containing employee details
- `id`: Employee ID

**Process:**

1. Gets authentication token
2. Makes PUT request to `/onlinedashboard/admin/employees/{id}`
3. Sends JSON body with updated employee data
4. Revalidates `/employees` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** PUT
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees/{id}`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body:** Updated employee data object

#### 4. `editPhotographer(data, id)`

**Location:** `_actions/edit-photographer.ts`

**Purpose:** Updates an existing photographer

**Parameters:**

- `data`: Object containing photographer details
- `id`: Photographer ID

**Process:**

1. Gets authentication token
2. Makes PUT request to photographer endpoint
3. Sends JSON body with updated photographer data
4. Revalidates `/employees` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** PUT
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees/photographers/{id}`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body:** Updated photographer data object

#### 5. `deleteEmployeer(id)`

**Location:** `_actions/delete-employeer.ts`

**Purpose:** Deletes an employee or photographer

**Parameters:**

- `id`: Employee/Photographer ID

**Process:**

1. Gets authentication token
2. Makes DELETE request to employee endpoint
3. Revalidates `/employees` path to refresh data
4. Returns API response

**API Endpoint:**

- **Method:** DELETE
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees/{id}`
- **Headers:**
  - `Authorization: Bearer {token}`

#### 6. `toggleEmployeeStatus(employeeId, data)`

**Location:** `_actions/toggle-employee-status.ts`

**Purpose:** Toggles employee/photographer active status

**Parameters:**

- `employeeId`: Employee/Photographer ID
- `data`: Object containing name and branch_id

**Process:**

1. Gets authentication token
2. Makes POST/PUT request to toggle status endpoint
3. Revalidates `/employees` path to refresh data
4. Returns API response

**API Endpoint:**

- **Method:** POST/PUT
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees/{id}/toggle-status`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body:** `{ name: string, branch_id: number }`

---

## Hooks

### 1. `useCreateEmployeer()`

**Location:** `_hooks/use-create-employeer.ts`

**Returns:**

- `CreateEmployeer`: Mutation function to create employee
- `CreatePending`: Boolean indicating if creation is in progress
- `CreateError`: Error object if creation fails

### 2. `useCreatePhotographer()`

**Location:** `_hooks/use-create-photographer.ts`

**Returns:**

- `CreatePhotographer`: Mutation function to create photographer
- `CreatePending`: Boolean indicating if creation is in progress
- `CreateError`: Error object if creation fails

### 3. `useEditEmployeer()`

**Location:** `_hooks/use-edit-employeer.ts`

**Returns:**

- `EditEmployeer`: Mutation function to update employee
- `EditPending`: Boolean indicating if update is in progress
- `EditError`: Error object if update fails

### 4. `useEditPhotographer()`

**Location:** `_hooks/use-edit-photographer.ts`

**Returns:**

- `EditPhotographer`: Mutation function to update photographer
- `EditPending`: Boolean indicating if update is in progress
- `EditError`: Error object if update fails

### 5. `useDeleteEmployeer()`

**Location:** `_hooks/use-delete-employeer.ts`

**Returns:**

- `DeleteEmployeer`: Mutation function to delete employee/photographer
- `DeletePending`: Boolean indicating if deletion is in progress
- `DeleteError`: Error object if deletion fails

### 6. `useToggleEmployeeStatus()`

**Location:** `_hooks/use-toggle-employee-status.ts`

**Returns:**

- `toggleStatus`: Mutation function to toggle status
- `togglePending`: Boolean indicating if toggle is in progress
- `toggleError`: Error object if toggle fails

---

## GET Requests

### 1. `GetAllEmployees(page, limit, search?)`

**Location:** `src/lib/api/employees.api.ts`

**Purpose:** Fetches paginated list of employees with optional search

**Parameters:**

- `page` (number, default: 1): Page number
- `limit` (number, default: 10): Items per page
- `search` (optional): Search term to filter employees

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees/?page={page}&limit={limit}&search={search}`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Cache:** `no-store` (always fetches fresh data)

**Response Structure:**

- `data`: Object containing:
  - `data`: Array of employee objects with:
    - `id`: Employee ID
    - `name`: Employee name
    - `email`: Employee email
    - `phone`: Phone number
    - `status`: Status (active/inactive)
    - `branch`: Branch object with name
    - `branch_id`: Branch ID
  - `meta`: Pagination metadata:
    - `current_page`: Current page number
    - `last_page`: Total number of pages
    - `per_page`: Items per page
    - `total`: Total number of employees

### 2. `GetAllPhotographers(page, limit, search?)`

**Location:** `src/lib/api/employees.api.ts`

**Purpose:** Fetches paginated list of photographers with optional search

**Parameters:**

- `page` (number, default: 1): Page number
- `limit` (number, default: 10): Items per page
- `search` (optional): Search term to filter photographers

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/employees/photographers?page={page}&limit={limit}&search={search}`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Cache:** `no-store` (always fetches fresh data)

**Response Structure:**

- `data`: Object containing:
  - `data`: Array of photographer objects with:
    - `id`: Photographer ID
    - `name`: Photographer name
    - `status`: Status (active/inactive)
    - `branch`: Branch object with name
    - `branch_id`: Branch ID
  - `meta`: Pagination metadata:
    - `current_page`: Current page number
    - `last_page`: Total number of pages
    - `per_page`: Items per page
    - `total`: Total number of photographers

---

## What is Done in This Route

### 1. **Data Display**

- Displays two separate tables in tabs:
  - **Employees Tab**: Shows regular employees with full details
  - **Photographers Tab**: Shows photographers with basic details
- Employees table columns:
  - **Status**: Toggle switch for active/inactive
  - **Name**: Employee name with avatar
  - **Email**: Employee email
  - **Phone Number**: Phone number
  - **Branch**: Branch name
  - **Actions**: Edit and Delete buttons
- Photographers table columns:
  - **Status**: Toggle switch for active/inactive
  - **Name**: Photographer name with avatar
  - **Branch**: Branch name
  - **Actions**: Edit and Delete buttons
- Shows count badges with total number of items
- Alternating row colors for better readability

### 2. **Tab Management**

- Provides tab interface to switch between employees and photographers
- Maintains separate pagination for each tab
- Resets to page 1 when switching tabs
- Updates URL parameters on tab change

### 3. **Employee/Photographer Creation**

- Provides dialog interface to create new employees or photographers
- Employee form fields:
  - Name (required)
  - Email (required)
  - Phone (required)
  - Branch selection (required)
- Photographer form fields:
  - Name (required)
  - Branch selection (required)
- Validates form data before submission
- Shows loading state during creation
- Displays success/error toast notifications
- Automatically refreshes data after successful creation

### 4. **Employee/Photographer Update**

- Provides dialog interface to edit existing employees or photographers
- Pre-fills form with current data
- Same validation as create form
- Shows loading state during update
- Displays success/error toast notifications
- Automatically refreshes data after successful update

### 5. **Status Toggle**

- Provides toggle switch for each employee/photographer
- Allows activating/deactivating staff members
- Shows loading state during toggle
- Displays success/error toast notifications
- Automatically refreshes data after successful toggle

### 6. **Employee/Photographer Deletion**

- Provides delete button for each staff member
- Shows confirmation dialog before deletion
- Shows loading state during deletion
- Displays success/error toast notifications
- Automatically refreshes data after successful deletion
- Removes deleted item from the list

### 7. **Pagination**

- Implements pagination for both tables
- Page state is maintained in URL search parameters
- Shows pagination controls when items exist
- Supports navigation between pages
- Separate pagination for employees and photographers

### 8. **Search Functionality**

- Supports search parameter in URL
- Filters employees/photographers by name
- Search is case-insensitive
- Maintains search term across page navigation

### 9. **Error Handling**

- Handles API errors gracefully
- Shows user-friendly error messages via toast notifications
- Displays empty states when no data is available
- Handles network errors

---

## File Structure

```
employees/
├── page.tsx                          # Server component - entry point
├── _components/
│   ├── employees-page.tsx            # Main page component
│   ├── employees-table.tsx           # Employees table component
│   ├── photographers-table.tsx      # Photographers table component
│   ├── add-employee-dialog.tsx       # Employee dialog
│   ├── add-employee-form.tsx         # Employee form
│   ├── add-photographer-dialog.tsx   # Photographer dialog
│   ├── add-or-edit-photographer-form.tsx # Photographer form
│   └── employee-skeleton.tsx         # Loading skeleton
├── _actions/
│   ├── create-employeer.ts           # Create employee server action
│   ├── create-photographer.ts        # Create photographer server action
│   ├── edit.employeer.ts            # Edit employee server action
│   ├── edit-photographer.ts          # Edit photographer server action
│   ├── delete-employeer.ts          # Delete employee server action
│   └── toggle-employee-status.ts    # Toggle status server action
└── _hooks/
    ├── use-create-employeer.ts       # Create employee hook
    ├── use-create-photographer.ts    # Create photographer hook
    ├── use-edit-employeer.ts         # Edit employee hook
    ├── use-edit-photographer.ts      # Edit photographer hook
    ├── use-delete-employeer.ts       # Delete employee hook
    └── use-toggle-employee-status.ts # Toggle status hook
```

