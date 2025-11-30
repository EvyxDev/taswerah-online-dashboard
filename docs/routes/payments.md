# Payments Route Documentation

## Route Path

`/[locale]/(dashboard)/payments`

## Overview

The payments route provides a comprehensive dashboard for viewing payment statistics and sync jobs for a selected branch. It displays summary cards, sync jobs table, and allows filtering and exporting sync data. Users can select a branch to view its payment statistics and sync job details.

---

## Components Used

### Main Components

1. **`page.tsx`** (Server Component)

   - Entry point for the payments route
   - Handles server-side data fetching
   - Processes URL search parameters (branch_id)
   - Fetches branches, branch sync stats, and employees

2. **`payment-page.tsx`** (Client Component)

   - Main UI component that displays the payments dashboard
   - Handles breadcrumb navigation
   - Manages branch selection
   - Renders summary cards and sync jobs table
   - Shows filter dialog

3. **`payment-card-section.tsx`** (Client Component)

   - Displays summary statistics cards
   - Shows total jobs, total pay amount, total photos, and success rate
   - Uses icons and color-coded cards

4. **`payment-table.tsx`** (Client Component)

   - Displays sync jobs in a table format
   - Shows employee, order code, status, photos, amount, and shift
   - Similar to dashboard sync jobs table

### Dialog Components

5. **`payment-filter-dialog.tsx`**

   - Dialog for filtering and exporting sync jobs data
   - Allows filtering by date range, branch, employee ID, or employee name
   - Displays sync jobs results with statistics
   - Exports filtered data to Excel

6. **`branch-selector.tsx`** (Client Component)

   - Branch selection dropdown component
   - Allows switching between branches
   - Updates URL with selected branch

---

## Flow

### 1. Page Load Flow

```
User navigates to /payments
    ↓
page.tsx (Server Component) receives request
    ↓
Extracts searchParams (branch_id)
    ↓
Gets authentication token
    ↓
Calls GetAllBranshes(token)
    ↓
If branch_id provided: Calls GetBranchSyncJobsStats(branch_id)
    ↓
If branch_id provided: Calls GetEmployeesByBranch(token, branch_id)
    ↓
Fetches data from APIs
    ↓
Passes data to PaymentPage component
    ↓
PaymentPage renders summary cards and sync jobs table
```

### 2. Branch Selection Flow

```
User selects branch from dropdown
    ↓
handleBranchChange(branchId) is called
    ↓
Updates currentBranchId state
    ↓
Updates URL search params with branch_id
    ↓
Router navigates to new URL
    ↓
page.tsx re-executes with new searchParams
    ↓
Fetches data for selected branch
    ↓
UI updates with branch-specific data
```

### 3. Sync Filter Export Flow

```
User clicks Export as Excel button
    ↓
PaymentFilterDialog opens
    ↓
User selects filters (dates, branch, employee, employee name)
    ↓
User clicks Export All Data button
    ↓
Calls GetSyncFilter() via usePaymentsSyncFilter hook
    ↓
Fetches filtered sync jobs data from API
    ↓
Displays sync jobs results with statistics
    ↓
User clicks Export as Excel button
    ↓
Calls exportSyncJobsToExcel() function
    ↓
Downloads Excel file with sync jobs data
```

---

## Actions

### Server Actions

No server actions are used in this route. All data fetching is done through API functions called from server components or client-side hooks.

---

## Hooks

### 1. `usePaymentsDashboard()`

**Location:** `_hooks/use-payment.ts` or `_hooks/use-payments-dashboard.ts`

**Purpose:** Hook for fetching payment dashboard data

**Returns:**

- Query data and loading states for payment dashboard

### 2. `usePaymentsSyncFilter(params)`

**Location:** `_hooks/use-sync-filter.ts`

**Returns:**

- `syncFilterData`: Filtered sync jobs data with statistics
- `isLoading`: Boolean indicating if data is loading
- `error`: Error object if fetch fails
- `refetch`: Function to manually refetch data

**Parameters:**

- `employee_id` (optional): Employee ID to filter by
- `employeeName` (optional): Employee name to search
- `from` (optional): Start date for filtering
- `to` (optional): End date for filtering
- `branch_id` (optional): Branch ID to filter by

**Usage:**

```typescript
const { syncFilterData, isLoading, refetch } = usePaymentsSyncFilter({
  employee_id: "123",
  employeeName: "John",
  from: "2024-01-01",
  to: "2024-01-31",
  branch_id: "1",
});
```

---

## GET Requests

### 1. `GetAllBranshes(token: string)`

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
  - Other branch properties

### 2. `GetBranchSyncJobsStats(branchId: string)`

**Location:** `src/lib/api/home.api.ts`

**Purpose:** Fetches sync jobs statistics for a specific branch

**Parameters:**

- `branchId` (string): Branch ID

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/sync-jobs/statistics?branch_id={branchId}`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`

**Response Structure:**

- `total_jobs`: Total number of sync jobs
- `total_pay_amount`: Total payment amount
- `total_photos`: Total number of photos
- `status_breakdown`: Object with status counts
- `jobs`: Array of sync job objects

### 3. `GetEmployeesByBranch(token, branchId)`

**Location:** `src/lib/api/client.api.ts`

**Purpose:** Fetches employees for a specific branch

**Parameters:**

- `token` (string): Authentication token
- `branchId` (string): Branch ID

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/onlinedashboard/admin/branches/{branchId}/employees`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`

**Response Structure:**

- `data`: Array of branch employee objects with:
  - `employee_id`: Employee ID
  - `employeeName`: Employee name
  - Other employee properties

### 4. `GetSyncFilter(params)`

**Location:** `src/lib/api/sync-filter.api.ts`

**Purpose:** Fetches filtered sync jobs data

**Parameters:**

- `employee_id` (optional): Employee ID
- `employeeName` (optional): Employee name
- `from` (optional): Start date
- `to` (optional): End date
- `branch_id` (optional): Branch ID

**API Request:**

- **Method:** GET
- **URL:** `/api/sync/filter`
- **Query Parameters:**
  - `employee_id`: Optional employee ID
  - `employeeName`: Optional employee name
  - `from`: Optional start date
  - `to`: Optional end date
  - `branch_id`: Optional branch ID
- **Headers:**
  - `Content-Type: application/json`

**Response Structure:**

- `sync_jobs`: Array of sync job objects
- `statistics`: Statistics object with:
  - `total_photos`: Total number of photos
  - `total_money`: Total money amount

---

## What is Done in This Route

### 1. **Branch Selection**

- Provides dropdown to select a branch
- Defaults to first branch if none selected
- Updates URL with selected branch ID
- Fetches branch-specific data on selection

### 2. **Summary Statistics**

- Displays four summary cards:
  - **Total Jobs**: Total number of sync jobs for selected branch
  - **Total Pay Amount**: Total payment amount in L.E
  - **Total Photos**: Total number of photos processed
  - **Success Rate**: Percentage of completed jobs
- Cards use icons and color coding
- Responsive grid layout

### 3. **Sync Jobs Table**

- Displays sync jobs in a table format with columns:
  - **Employee**: Employee name with avatar and phone number
  - **Order Code**: Barcode prefix
  - **Status**: Job status with color-coded badge
  - **Photos**: Number of photos
  - **Amount**: Payment amount in L.E
  - **Shift**: Shift name
- Status badges use color coding
- Shows count badge with total number of sync jobs
- Alternating row colors for better readability

### 4. **Sync Filter Export**

- Provides filter dialog for exporting sync jobs
- Allows filtering by:
  - Date range (from/to dates)
  - Branch (dropdown selection)
  - Employee ID (dropdown, requires branch selection)
  - Employee name (text search)
- Displays filtered sync jobs with details
- Shows statistics:
  - Total jobs count
  - Total photos
  - Total money
- Exports filtered data to Excel format
- Excel file includes all sync job details

### 5. **Error Handling**

- Handles API errors gracefully
- Shows empty state when no branch is selected
- Displays "Please select branch" message
- Handles loading states during data fetching

### 6. **URL Parameters**

The route accepts the following URL search parameters:

- `branch_id` (string, optional): Branch ID to view payments for

**Example URLs:**

- `/payments` - Defaults to first branch
- `/payments?branch_id=1` - Payments for branch 1
- `/payments?branch_id=2` - Payments for branch 2

---

## File Structure

```
payments/
├── page.tsx                          # Server component - entry point
├── _components/
│   ├── payment-page.tsx             # Main page component
│   ├── payment-card-section.tsx     # Summary cards component
│   ├── payment-table.tsx            # Sync jobs table component
│   ├── payment-filter-dialog.tsx    # Filter and export dialog
│   ├── branch-selector.tsx          # Branch selector component
│   └── payment-skeletons.tsx        # Loading skeletons
└── _hooks/
    ├── use-payment.ts               # Payment data hook
    ├── use-payments-dashboard.ts    # Dashboard data hook
    └── use-sync-filter.ts           # Sync filter hook
```

