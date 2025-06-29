# Changelog

All notable changes to this project will be documented in this file.

## [0.2.13]

### Added

- Enhanced ScatterChart with multiple series support
- Added error bars functionality for ScatterChart
- Added bubble chart functionality with variable point sizes
- Added series visibility toggle feature
- Updated ScatterChart documentation with new examples
- Added comprehensive test cases for new ScatterChart features

### Fixed

- Fixed TypeScript type issues with ScatterChart props
- Improved code formatting and consistency

## [0.2.7]

### Added

- Funnel Charts enabled
- Funnel charts types include FunnelCharts, Segmented Funnel Charts , TimeSeries Funnel Charts
- Styleguide config updated and simplified along with comprehensive readme
- NestedDonut Component now has additional props enabled

## [0.2.6]

### Fixed

- Fixed RadarChart legend overflowing by dynamically adjusting chart area and re-integrating clickable legend logic.

### Changed

- Improved demo sidebar styling for better scalability and visual appeal.

## [0.2.5]

### Fixed

- Fixed React Hook useEffect dependency warning in `NestedDonutChartRenderer.tsx` by wrapping `handleSliceClick` in useCallback.

## [0.2.4]

### Added

- Glow effect examples for Donut, NestedDonut, and GaugeDonut charts using existing demo file.

### Changed

- Updated styleguide configuration to use existing examples and prevent component duplication in sidebar.
- Optimized package size by excluding unnecessary files (`public`, `screens`) from published package.

### Fixed

- Resolved React Hook useEffect dependency warning in `NestedDonutChartRenderer.tsx`.

## [0.2.2]

### Added

- support for New chart types (DonutChart, NestedDonutChart, GaugeDonutChart)

## [0.2.1]

### Fixed

- Fixed TypeScript type definitions
- Improved build configuration

## [0.2.0]

### Added

- Individual README files for components
- Comprehensive test cases
- Global test setup

### Changed

- Refactored main README
- Improved D3 rendering logic
- Enhanced tooltip styling and typings

## [0.1.9]

### Fixed

- LineChart component export in TypeScript declaration files
- Type declaration generation
