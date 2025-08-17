# Timezone Shift Demo

This is a modern React + TypeScript demo app showcasing all capabilities of the [timezone-shift](https://www.npmjs.com/package/timezone-shift) library. It features interactive tabs, real-time clocks, business hour calculations, DST exploration, and a full API demonstration.

## Features

- 🌍 **World Clock**: Real-time clocks for major cities, automatic DST/BST handling
- 🔄 **Time Converter**: Convert times between any supported timezones
- 🌞 **DST Explorer**: Visualize daylight saving transitions and rules
- 💼 **Business Hours**: See if a city is currently in business hours
- 🛠️ **API Demo**: Interactive playground for all timezone-shift functions

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

## Project Structure

- `src/components/TimezoneDemo.tsx` — Main demo component with all tabs
- `src/components/TimezoneDemo.css` — Modern dark theme styles
- `public/` — Static assets

## Customization

- Add more cities/timezones in `TIMEZONES` array in `TimezoneDemo.tsx`
- Update styles in `TimezoneDemo.css` for branding

## License

MIT
