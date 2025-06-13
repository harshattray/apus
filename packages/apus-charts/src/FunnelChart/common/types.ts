export interface ChartLegendItem {
  id: string;
  name: string;
  color?: string;
}

export interface ChartLegendProps {
  legendItems: ChartLegendItem[];
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  legendTitle?: string;
  legendTitleColor?: string;
  legendTitleFontSize?: string;
  legendTitleFontFamily?: string;
  legendItemColor?: string;
  legendItemFontSize?: string;
  legendItemFontFamily?: string;
  legendSwatchSize?: number;
  legendSwatchBorderColor?: string;
  legendSwatchBorderWidth?: number;
  legendGap?: number;
  legendPadding?: string | number;
  clickableLegend?: boolean;
  onLegendItemClick?: (item: ChartLegendItem | null) => void;
  selectedItem?: string | null; // For highlighting selected legend items
  isDarkMode?: boolean;
}
