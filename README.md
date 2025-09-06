# Timezone Shift Demo

This is a modern React + TypeScript demo app showcasing all capabilities of the [timezone-shift](https://www.npmjs.com/package/timezone-shift) library (v0.1.2+). It features interactive tabs, real-time clocks, business hour calculations, DST exploration, comprehensive error handling, and a full API demonstration including the latest auto-detection features.

## ✨ Features

- 🌍 **World Clock**: Real-time clocks for major cities with automatic DST/BST handling
- 🔄 **Time Converter**: Convert times between any supported timezones
- 🌞 **DST Explorer**: Visualize daylight saving transitions and rules
- 💼 **Business Hours**: See if a city is currently in business hours
- 🛠️ **API Demo**: Interactive playground for all timezone-shift functions
- 🚀 **Auto-Detection**: New auto-detection functions (isDSTNow, formatNow, etc.)
- 🔧 **Runtime Registry**: Dynamic timezone registration and cache management
- 🛡️ **Error Boundaries**: Comprehensive error handling for robust UX
- ⚡ **Performance Optimized**: React.memo, useMemo, and efficient re-renders

## 🆕 Latest Updates

### New Auto-Detection Functions

- `isDSTNow()` - Check current DST status automatically
- `getCurrentTimezoneParts()` - Get current time parts for user's timezone
- `inWorkingHoursNow()` - Check if currently in business hours
- `formatNow()` - Format current time with auto-detection
- `getDetectedTimezone()` - Get user's detected timezone
- `getTimezoneInfo()` - Get comprehensive timezone information

### Runtime Registry Features

- `validateAndRegisterTimezone()` - Dynamic timezone registration
- `clearRuntimeTimezoneCache()` - Cache management utilities

### Performance & Architecture Improvements

- Optimized component re-renders with React.memo
- Memoized expensive calculations
- Error boundary implementation
- TypeScript strict mode compliance
- ESLint zero-warnings compliance

## Tech Stack

- React 18
- TypeScript
- Vite
- timezone-shift library

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Open in browser**
   Visit [http://localhost:5173](http://localhost:5173)

## Usage

- Use the tab navigation at the top to explore each feature
- The API Demo tab lets you interactively test all timezone-shift endpoints
- All time calculations automatically handle DST/BST transitions

## Customization

- Add more cities/timezones in `TIMEZONES` array in `TimezoneDemo.tsx`
- Update styles in `TimezoneDemo.css` for branding

## License

MIT
