# Settings Route Documentation

## Route Path

`/[locale]/(dashboard)/settings`

## Overview

The settings route allows administrators to manage frames and stickers. Users can upload new frames and stickers, view existing media in galleries, and manage media assets used throughout the application.

---

## Components Used

### Main Components

1. **`page.tsx`** (Server Component)

   - Entry point for the settings route
   - Handles server-side data fetching
   - Fetches frames and stickers data

2. **`settings-page.tsx`** (Client Component)

   - Main UI component that displays the settings interface
   - Manages frame and sticker uploads
   - Renders media uploaders and galleries

3. **`media-uploader.tsx`** (Client Component)

   - Component for uploading media files
   - Supports drag and drop
   - Handles file selection and preview
   - Triggers upload action

4. **`media-gallery.tsx`** (Client Component)

   - Displays gallery of uploaded media
   - Shows media items in a grid layout
   - Supports selection and management

---

## Flow

### 1. Page Load Flow

```
User navigates to /settings
    ↓
page.tsx (Server Component) receives request
    ↓
Gets authentication token
    ↓
Calls GetAllFrames(token)
    ↓
Calls GetAllStickers(token)
    ↓
Fetches data from APIs in parallel
    ↓
Passes data to SettingsPage component
    ↓
SettingsPage renders uploaders and galleries
```

### 2. Upload Frames Flow

```
User selects or drags frame images
    ↓
MediaUploader handles file selection
    ↓
User clicks Upload button
    ↓
uploadFrames(files) is called
    ↓
Calls UploadFrames() from useUploadFrames hook
    ↓
Hook calls uploadFrames() server action
    ↓
Server action creates FormData and makes POST request
    ↓
On success: Shows success toast, refreshes page
    ↓
UI updates with new frames
```

### 3. Upload Stickers Flow

```
User selects or drags sticker images
    ↓
MediaUploader handles file selection
    ↓
User clicks Upload button
    ↓
uploadStickers(files) is called
    ↓
Calls UploadStickers() from useUploadStickers hook
    ↓
Hook calls uploadStickers() server action
    ↓
Server action creates FormData and makes POST request
    ↓
On success: Shows success toast, refreshes page
    ↓
UI updates with new stickers
```

---

## Actions

### Server Actions

#### 1. `uploadFrames(formData: FormData)`

**Location:** `actions/upload-frames.ts`

**Purpose:** Uploads frame images

**Parameters:**

- `formData` (FormData): Contains frame image files

**Process:**

1. Gets authentication token
2. Makes POST request to `/frames`
3. Sends FormData in request body
4. Revalidates `/settings` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** POST
- **URL:** `${NEXT_PUBLIC_API}/frames`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Body:** FormData with frame image files

#### 2. `uploadStickers(formData: FormData)`

**Location:** `actions/upload-stickers.ts`

**Purpose:** Uploads sticker images

**Parameters:**

- `formData` (FormData): Contains sticker image files

**Process:**

1. Gets authentication token
2. Makes POST request to `/stickers`
3. Sends FormData in request body
4. Revalidates `/settings` path to refresh data
5. Returns API response

**API Endpoint:**

- **Method:** POST
- **URL:** `${NEXT_PUBLIC_API}/stickers`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Body:** FormData with sticker image files

---

## Hooks

### 1. `useUploadFrames()`

**Location:** `_hooks/use-upload-frames.ts`

**Returns:**

- `UploadFrames`: Mutation function to upload frames
- `UploadFramesPending`: Boolean indicating if upload is in progress
- `UploadFramesError`: Error object if upload fails

**Usage:**

```typescript
const { UploadFrames, UploadFramesPending } = useUploadFrames();

UploadFrames(
  { files: selectedFiles },
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

### 2. `useUploadStickers()`

**Location:** `_hooks/use-upload-stickers.ts`

**Returns:**

- `UploadStickers`: Mutation function to upload stickers
- `UploadStickersPending`: Boolean indicating if upload is in progress
- `UploadStickersError`: Error object if upload fails

**Usage:**

```typescript
const { UploadStickers, UploadStickersPending } = useUploadStickers();

UploadStickers(
  { files: selectedFiles },
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

### 1. `GetAllFrames(token: string)`

**Location:** `src/lib/api/frames.api.ts`

**Purpose:** Fetches all frames

**Parameters:**

- `token` (string): Authentication token

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/frames`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`

**Response Structure:**

- Array of photo/media objects containing frame information

### 2. `GetAllStickers(token: string)`

**Location:** `src/lib/api/stickers.api.ts`

**Purpose:** Fetches all stickers

**Parameters:**

- `token` (string): Authentication token

**API Request:**

- **Method:** GET
- **URL:** `${NEXT_PUBLIC_API}/stickers`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`

**Response Structure:**

- Array of photo/media objects containing sticker information

---

## What is Done in This Route

### 1. **Frames Management**

- Provides uploader interface for frames
- Supports drag and drop file selection
- Allows multiple file selection
- Shows upload progress
- Displays frames gallery
- Shows empty state when no frames exist

### 2. **Stickers Management**

- Provides uploader interface for stickers
- Supports drag and drop file selection
- Allows multiple file selection
- Shows upload progress
- Displays stickers gallery
- Shows empty state when no stickers exist

### 3. **Media Upload**

- Handles file selection via drag and drop or file picker
- Validates file types
- Shows file previews
- Displays upload progress
- Shows loading state during upload
- Displays success/error toast notifications
- Automatically refreshes data after successful upload

### 4. **Media Gallery**

- Displays uploaded media in a grid layout
- Shows media items with previews
- Supports media selection (if implemented)
- Shows empty state when no media exists

### 5. **Error Handling**

- Handles API errors gracefully
- Shows user-friendly error messages via toast notifications
- Displays empty states when no media exists
- Handles file upload errors

---

## File Structure

```
settings/
├── page.tsx                          # Server component - entry point
├── _components/
│   ├── settings-page.tsx            # Main page component
│   ├── media-uploader.tsx           # Media upload component
│   └── media-gallery.tsx             # Media gallery component
├── _hooks/
│   ├── use-upload-frames.ts         # Upload frames hook
│   └── use-upload-stickers.ts       # Upload stickers hook
└── actions/
    ├── upload-frames.ts             # Upload frames server action
    └── upload-stickers.ts           # Upload stickers server action
```

