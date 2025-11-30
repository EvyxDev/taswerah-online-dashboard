# Dashboard Route Documentation

## Route Path

`/[locale]/(dashboard)`

## Overview

The dashboard route is the main home page that displays an overview of sync jobs statistics, branch synchronization status, and recent sync job activities. It provides a comprehensive view of the system's sync operations with summary cards, branch sync information, and a detailed sync jobs table.

---

## Components Used

### Main Components

1. **`page.tsx`** (Server Component)

   - Entry point for the dashboard route
   - Handles server-side data fetching
   - Fetches home states and branches last sync data

2. **`dash-board.tsx`** (Client Component)

   - Main UI component that displays the dashboard
   - Handles breadcrumb navigation
   - Renders summary cards, branch sync table, and sync jobs table
   - Manages last sync status display

3. **`card-sectoin.tsx`** (Client Component)

   - Displays summary statistics cards
   - Shows total jobs, total pay amount, total photos, and success rate
   - Uses icons and color-coded cards

4. **`dash-table.tsx`** (Client Component)

   - Displays recent sync jobs in a table format
   - Shows employee, order code, status, photos, amount, and shift
   - Supports delete action for sync jobs
   - Shows status badges with color coding

5. **`branches-last-sync-table.tsx`** (Client Component)

   - Displays branches and their last sync times
   - Shows branch name and last sync timestamp
   - Displays empty state when no data

---

## Flow

### 1. Page Load Flow

```
User navigates to / (dashboard home)
    ↓
page.tsx (Server Component) receives request
    ↓
Calls GethomeStates()
    ↓
Calls GetBranchesLastSyncServer()
    ↓
Fetches data from APIs
    ↓
Passes data to DashBoard component
    ↓
DashBoard renders summary cards, branch sync table, and sync jobs table
```

### 2. Delete Sync Job Flow

```
User clicks delete button on a sync job
    ↓
DeleteDialog opens with confirmation
    ↓
User confirms deletion
    ↓
DeleteSyncJobAsync() from useDeleteSyncJob hook is called
    ↓
Hook calls deleteSyncJob() server action
    ↓
Server action makes DELETE request to API
    ↓
On success: Shows success message, refreshes page
    ↓
On error: Shows error message
    ↓
revalidatePath("/") refreshes page data
    ↓
UI updates (sync job removed from list)
```

### 3. Last Sync Status Flow

```
DashBoard component mounts
    ↓
useLastSync() hook is called
    ↓
Calls GetLastSyncClient() via useQuery
    ↓
Fetches last sync time from API
    ↓
Displays formatted last sync time
    ↓
Auto-refreshes every 10 minutes
```

---

## Actions

### Server Actions

#### 1. `deleteSyncJob(id: number)`

**Location:** `actions/delete-sync-job.ts`

**Purpose:** Deletes a sync job

**Parameters:**

- `id` (number): Sync job ID

**Process:**

1. Gets authentication token
2. Makes DELETE request to `/sync-jobs/{id}`
3. Revalidates `/` path to refresh data
4. Returns API response

**API Endpoint:**

- **Method:** DELETE
- **URL:** `${NEXT_PUBLIC_API}/sync-jobs/{id}`
- **Headers:**
  - `Authorization: Bearer {token}`

---

## Hooks

### 1. `useLastSync()`

**Location:** `_hooks/use-branshes.ts`

**Returns:**

- `data`: Last sync data with synced_at timestamp
- `isLoading`: Boolean indicating if data is loading
- `error`: Error object if fetch fails
- `refetch`: Function to manually refetch data

**Usage:**

```typescript
const { data: lastSync, isLoading: lastSyncLoading } = useLastSync();
```

**Features:**

- Auto-refreshes every 10 minutes
- Does not refetch on window focus

### 2. `useDeleteSyncJob()`

**Location:** `_hooks/use-delete-sync-job.ts`

**Returns:**

- `DeleteSyncJob`: Mutation function to delete sync job
- `DeleteSyncJobAsync`: Async mutation function
- `DeletePending`: Boolean indicating if deletion is in progress
- `DeleteError`: Error object if deletion fails

**Usage:**

```typescript
const { DeleteSyncJobAsync } = useDeleteSyncJob();

DeleteSyncJobAsync(
  { id: 123 },
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

---

## GET Requests

### 1. `GethomeStates()`

**Location:** `src/lib/api/home.api.ts`

**Purpose:** Fetches sync jobs statistics and overview data

**Parameters:**

- None

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/sync-jobs/statistics`
- **Headers:**
  - `Authorization: Bearer {token}`

**Response Structure:**

- `total_jobs`: Total number of sync jobs
- `total_pay_amount`: Total payment amount
- `total_photos`: Total number of photos
- `status_breakdown`: Object with status counts (completed, failed, pending, etc.)
- `jobs`: Array of recent sync job objects with:
  - `id`: Job ID
  - `employeeName`: Employee name
  - `orderprefixcode`: Order barcode prefix
  - `status`: Job status
  - `number_of_photos`: Number of photos
  - `pay_amount`: Payment amount
  - `shift_name`: Shift name
  - `orderphone`: Order phone number

### 2. `GetBranchesLastSyncServer()`

**Location:** `src/lib/api/branches.server.ts`

**Purpose:** Fetches last sync time for all branches

**Parameters:**

- None

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/branches/last-sync`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Cache:** `no-store` (always fetches fresh data)

**Response Structure:**

- Array of branch last sync objects containing:
  - `branch_id`: Branch ID
  - `branch_name`: Branch name
  - `last_sync_job_id`: Last sync job ID (can be null)
  - `last_sync_time`: Last sync timestamp (can be null)

### 3. `GetLastSyncClient()`

**Location:** `src/lib/api/last-sync.api.ts`

**Purpose:** Fetches overall last sync time (client-side)

**Parameters:**

- None

**API Request:**

- **Method:** GET
- **URL:** `/api/sync/last`
- **Headers:**
  - `Content-Type: application/json`

**Response Structure:**

- `synced_at`: Last synchronization timestamp

---

## What is Done in This Route

### 1. **Summary Statistics**

- Displays four summary cards:
  - **Total Jobs**: Total number of sync jobs
  - **Total Pay Amount**: Total payment amount in L.E
  - **Total Photos**: Total number of photos processed
  - **Success Rate**: Percentage of completed jobs
- Cards use icons and color coding
- Responsive grid layout

### 2. **Branches Last Sync Table**

- Displays table of all branches with their last sync times
- Shows branch name and formatted last sync timestamp
- Displays "-" when no sync time is available
- Shows empty state when no branches exist

### 3. **Recent Sync Jobs Table**

- Displays sync jobs in a table format with columns:
  - **Employee**: Employee name with avatar and phone number
  - **Order Code**: Barcode prefix
  - **Status**: Job status with color-coded badge
  - **Photos**: Number of photos
  - **Amount**: Payment amount in L.E
  - **Shift**: Shift name
  - **Actions**: Delete button (if showDeleteAction is true)
- Status badges use color coding:
  - **Completed**: Green
  - **Failed**: Red
  - **Pending**: Yellow
  - **Synced**: Blue
- Shows count badge with total number of sync jobs
- Alternating row colors for better readability

### 4. **Last Sync Status**

- Displays overall last sync time at the top of the page
- Auto-refreshes every 10 minutes
- Shows loading state during fetch
- Displays formatted date and time

### 5. **Sync Job Deletion**

- Provides delete button for each sync job (on dashboard home)
- Shows confirmation dialog before deletion
- Displays success/error messages
- Automatically refreshes data after successful deletion

### 6. **Error Handling**

- Handles API errors gracefully
- Shows empty states when no data is available
- Displays loading states during data fetching

---

## File Structure

```
(dashboard)/
├── page.tsx                          # Server component - entry point
├── _components/
│   ├── dash-board.tsx               # Main dashboard component
│   ├── card-sectoin.tsx             # Summary cards component
│   ├── dash-table.tsx               # Sync jobs table component
│   └── branches-last-sync-table.tsx # Branch sync table component
├── _hooks/
│   └── use-branshes.ts              # Branches and last sync hooks
└── actions/
    └── delete-sync-job.ts           # Delete sync job server action
```
