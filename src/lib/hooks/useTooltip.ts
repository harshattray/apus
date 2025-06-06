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
  boxShadow?: string;
  zIndex?: number;
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
      if (!content) {
        console.log('[useTooltip] No content, returning from showTooltip.');
        return;
      }

      // Ensure tooltip is visible and positioned correctly
      tooltip.style('display', 'block').style('opacity', 1).html(content);

      // Get tooltip dimensions after content is rendered
      const tooltipNode = tooltip.node();
      if (tooltipNode) {
        const tooltipRect = tooltipNode.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // Adjust x position to prevent tooltip from going off-screen
        let adjustedX = x + offsetX;
        if (adjustedX + tooltipRect.width / 2 > windowWidth - 10) {
          adjustedX = windowWidth - tooltipRect.width / 2 - 10;
        } else if (adjustedX - tooltipRect.width / 2 < 10) {
          adjustedX = tooltipRect.width / 2 + 10;
        }

        tooltip
          .style('left', `${adjustedX}px`)
          .style('top', `${y + offsetY}px`)
          .style('transform', 'translate(-50%, -100%)')
          .style('pointer-events', 'none');
      } else {
        console.warn(
          '[useTooltip] Tooltip node is null/undefined after setting content in showTooltip.',
        );
      }
    },
    [tooltipRef],
  );

  /**
   * Hide the tooltip
   */
  const hideTooltip = useCallback(() => {
    const tooltip = d3.select(tooltipRef.current);
    tooltip.style('opacity', 0).style('display', 'none');
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
      .style('z-index', styles.zIndex || 9999)
      .style('box-shadow', styles.boxShadow || '0 2px 8px rgba(0, 0, 0, 0.15)');
  }, [tooltipRef, styles]);

  return {
    showTooltip,
    hideTooltip,
    applyTooltipStyles,
  };
};
