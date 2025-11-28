# Vehicle Fleet Management App

This is a React app I built for managing a vehicle fleet. It lets you view, search, filter, and edit vehicle information with a clean interface.

## What it does

The app shows a list of vehicles with their details like name, model, status, location, and when they were last seen. You can search through vehicles, filter by online/offline status, sort the list, and edit vehicle information. There's also a CSV export feature if you need to download the data.

## Features

- Paginated list showing 5 vehicles per page
- Search vehicles by name
- Filter by status (all, online, offline)
- Sort by vehicle name or last seen date
- Click any vehicle to see full details in a side panel
- Edit vehicle name and status
- Export filtered results as CSV
- Mock API that simulates backend calls

## Tech stack

- React 19.2.0
- Vite for building
- Plain CSS for styling

## Getting started

Make sure you have Node.js installed (v16 or higher should work).

1. Clone the repo and navigate to it:
```bash
git clone <repo-url>
cd react-ass
```

2. Install dependencies:
```bash
npm install
```

3. Start the dev server:
```bash
npm run dev
```

The app should open at http://localhost:5173 (or whatever port Vite assigns).

## How to use

**Viewing vehicles**: The main page shows all vehicles in a table. Click any row to see more details.

**Searching**: Type in the search box to filter vehicles by name. It's case-insensitive.

**Filtering**: Use the status dropdown to show only online or offline vehicles, or all of them.

**Sorting**: Click the "Vehicle Name" or "Last Seen" column headers to sort. Click again to reverse the order.

**Editing**: Click a vehicle to open details, then click Edit. Change the name or status and hit Save.

**Export**: Click Export CSV to download the current filtered/sorted list as a CSV file.

**Pagination**: Use Previous/Next buttons to move between pages.

## Project structure

```
src/
  components/
    VehicleList.jsx    - Main list component
    VehicleRow.jsx     - Individual row component
    VehicleDetails.jsx - Details panel
  services/
    mockApi.js         - Mock API functions
  App.jsx              - Root component
```

## Mock API

The mock API is in `src/services/mockApi.js`. It has three functions:

- `getVehicles()` - Returns all vehicles (adds a 300ms delay to simulate network)
- `getVehicleById(id)` - Gets a single vehicle by ID
- `updateVehicle(id, updates)` - Updates vehicle data

All functions add small delays to make it feel like a real API. The data is stored in memory, so changes persist during the session but reset on refresh.

## Building for production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## Notes

The app uses React hooks for state management. I used `useMemo` to optimize filtering and sorting so it doesn't recalculate on every render. The pagination limits how many items are rendered at once which helps with performance.

The UI is responsive and should work on mobile, tablet, and desktop. The details panel becomes full-width on smaller screens.

Right now it uses a mock API. In a real app you'd replace the mockApi.js functions with actual API calls to a backend.

## Future improvements

Some things I might add later:
- Unit tests
- More filter options (by location, model, etc.)
- Bulk operations
- Charts for telemetry data
- Real-time updates
- Better error handling

---

Built as a React assignment to demonstrate component structure, state management, and API integration.
