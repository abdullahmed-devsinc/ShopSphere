# ShopSphere

A React-based product catalog application with state management via Redux Toolkit, client-side routing, and Cloudinary integration for image uploads.

## Setup and Run Instructions

Assuming you already have Node.js installed on your machine:

1. Clone the repository and navigate to the project root:
   ```bash
   cd ShopSphere
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables (see Cloudinary Setup section below).

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Folder Structure

The application follows a feature-centric structure rather than separating by file type (like having all actions/reducers in separate giant folders).

*   `src/Features/`: Contains our Redux slices grouped by feature (Products, Cart, Wishlist). This keeps the state logic closely tied to the domain it represents.
*   `src/Pages/`: Contains the top-level route components. These are lazy-loaded in `Routes.jsx` for code splitting.
*   `src/Components/`: Reusable, generic UI components (`Button`, `ItemCard`, `Navbar`) that are agnostic to the business logic.
*   `src/Store/`: Holds the Redux store configuration and persistence middleware.
*   `src/Schema/`: Formik/Yup validation schemas.
*   `src/hooks/`: Custom React hooks (like `useCloudinaryUpload`).

## Redux Slice Design

We use three distinct slices to keep concerns separated:

1.  **`productSlice`**: Owns the master list of all products (the catalog). It also manages the active filter state, search query, and sorting preference. If a product's stock changes or a new product is added, it happens here.
2.  **`cartSlice`**: Owns the user's shopping cart. It manages what items are in the cart and their quantities. It handles the logic for increasing/decreasing quantities and removing items.
3.  **`wishlistSlice`**: A lightweight slice that simply tracks which product IDs the user has saved for later.

Derived data (like calculating the total cart price or the filtered list of products) is handled using memoized selectors (`createSelector`) rather than storing duplicate data in the state.

## Persistence

Data persistence is handled natively without external libraries (like `redux-persist`). 

This is implemented directly in `src/Store/index.js`. We use `store.subscribe()` to listen for any state changes. Whenever an action is dispatched, the callback fires, grabs the latest state via `store.getState()`, and saves the cart, wishlist, and products slices to `localStorage`. 

When the app first loads, we parse `localStorage` and inject it into the `configureStore` setup via `preloadedState`.

## Cloudinary Setup

To get the "Add Product" image upload working, you need to configure Cloudinary environment variables.

1. Create a `.env` file in the root directory.
2. Add the following variables:
   ```env
   VITE_CLOUDINARY_LINK=https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload
   VITE_CLOUDINARY_UPLOAD_PRESET=<your_upload_preset>
   ```
3. **Important for the Reviewer**: In your Cloudinary Dashboard, go to Settings -> Upload. You must create an "Upload preset" and set the Signing Mode to **Unsigned**. Copy that preset name and place it in the `.env` file.

## Known Limitations & Future Improvements

If I had more time, I would revisit the following areas:

*   **Synchronous LocalStorage Writes**: Currently, `store.subscribe()` writes to `localStorage` on every single Redux action. If a user is typing in a search bar and dispatching actions on every keystroke, this synchronous write could cause UI lag. I would wrap the write function in a `debounce` (e.g., 500ms).
*   **ID Generation**: When adding a new product, the `productSlice` calculates the next ID by mapping over the array to find the `Math.max`. This is `O(n)` complexity and unsafe for concurrent use. In a real app, I'd use `nanoid()` or rely on a backend database.
*   **Initial State Mutation Risk**: In `productSlice`, `resetFilters` assigns `state.filters = initialFilters`. Because `initialFilters` is declared outside the slice, mutating the state later could accidentally mutate the external reference. Returning a deep copy would be safer.
