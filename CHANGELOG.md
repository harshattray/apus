# Changelog

All notable changes to this project will be documented in this file.

## [0.2.5] - 2024-03-21

### Fixed
- Fixed React Hook useEffect dependency warning in `NestedDonutChartRenderer.tsx` by wrapping `handleSliceClick` in useCallback.

## [0.2.4] - 2024-07-30

### Added
- Glow effect examples for Donut, NestedDonut, and GaugeDonut charts using existing demo file.

### Changed
- Updated styleguide configuration to use existing examples and prevent component duplication in sidebar.
- Optimized package size by excluding unnecessary files (`public`, `screens`) from published package.

### Fixed
- Resolved React Hook useEffect dependency warning in `NestedDonutChartRenderer.tsx`.

## [0.2.2] - 2024-03-19

### Added
-  support for New chart types (DonutChart, NestedDonutChart, GaugeDonutChart)


## [0.2.1] - 2024-03-18

### Fixed
- Fixed TypeScript type definitions
- Improved build configuration

## [0.2.0] - 2024-03-17

### Added
- Individual README files for components
- Comprehensive test cases
- Global test setup

### Changed
- Refactored main README
- Improved D3 rendering logic
- Enhanced tooltip styling and typings

## [0.1.9] - 2024-03-16

### Fixed
- LineChart component export in TypeScript declaration files
- Type declaration generation 