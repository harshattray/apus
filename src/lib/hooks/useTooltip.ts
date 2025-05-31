/**
 * @file useTooltip.ts
 * @description Custom hook for handling chart tooltips
 */
import { RefObject, useCallback } from 'react';
import * as d3 from 'd3';

type TooltipStyles = {
  backgroundColor: string;
  textColor: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
};

/**
 * Custom hook to handle chart tooltips
 * @param tooltipRef - Reference to the tooltip element
 * @param styles - Tooltip styles
 * @returns Functions to show and hide the tooltip
 */
export const useTooltip = (tooltipRef: RefObject<HTMLDivElement>, styles: TooltipStyles) => {
  /**
   * Show the tooltip with the given content at the specified position
   * @param content - HTML content to display in the tooltip
   * @param x - X position of the tooltip
   * @param y - Y position of the tooltip
   * @param offsetX - Optional X offset
   * @param offsetY - Optional Y offset
   */
  const showTooltip = useCallback(
    (content: string, x: number, y: number, offsetX = 0, offsetY = 0) => {
      const tooltip = d3.select(tooltipRef.current);

      tooltip
        .style('opacity', 1)
        .html(content)
        .style('left', `${x + offsetX}px`)
        .style('top', `${y + offsetY}px`)
        .style('transform', 'translate(-50%, -100%)');
    },
    [tooltipRef],
  );

  /**
   * Hide the tooltip
   */
  const hideTooltip = useCallback(() => {
    const tooltip = d3.select(tooltipRef.current);
    tooltip.style('opacity', 0);
  }, [tooltipRef]);

  /**
   * Apply styles to the tooltip element
   */
  const applyTooltipStyles = useCallback(() => {
    const tooltip = d3.select(tooltipRef.current);

    tooltip
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background-color', styles.backgroundColor)
      .style('color', styles.textColor)
      .style('padding', styles.padding)
      .style('border-radius', styles.borderRadius)
      .style('font-size', styles.fontSize)
      .style('opacity', 0)
      .style('transition', 'opacity 0.2s')
      .style('z-index', 10);
  }, [tooltipRef, styles]);

  return {
    showTooltip,
    hideTooltip,
    applyTooltipStyles,
  };
};
