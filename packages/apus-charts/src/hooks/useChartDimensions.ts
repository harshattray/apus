/**
 * @file useChartDimensions.ts
 * @description Custom hook for handling responsive chart dimensions
 */
import { useState, useEffect, RefObject } from 'react';

export type Dimensions = {
  width: number;
  height: number;
};

/**
 * Custom hook to handle responsive chart dimensions
 * @param containerRef - Reference to the container element
 * @param initialWidth - Initial width of the chart
 * @param initialHeight - Initial height of the chart
 * @param responsive - Whether the chart should be responsive
 * @returns Current dimensions of the chart
 */
export const useChartDimensions = (
  containerRef: RefObject<HTMLDivElement>,
  initialWidth: number,
  initialHeight: number,
  responsive: boolean,
): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: responsive && containerRef.current ? containerRef.current.clientWidth : initialWidth,
    height:
      responsive && containerRef.current
        ? containerRef.current.clientWidth * (initialHeight / initialWidth)
        : initialHeight,
  });

  useEffect(() => {
    const currentContainer = containerRef.current;

    if (!responsive || !currentContainer) {
      setDimensions({ width: initialWidth, height: initialHeight });
      return;
    }

    // Initial dimensions calculation
    setDimensions({
      width: currentContainer.clientWidth,
      height: currentContainer.clientWidth * (initialHeight / initialWidth),
    });

    const observer = new ResizeObserver((entries) => {
      const { clientWidth } = entries[0].target as HTMLElement;
      setDimensions({
        width: clientWidth,
        height: clientWidth * (initialHeight / initialWidth),
      });
    });

    observer.observe(currentContainer);

    // Clean up the observer
    return () => {
      observer.unobserve(currentContainer);
    };
  }, [responsive, initialWidth, initialHeight, containerRef]);

  return dimensions;
};
