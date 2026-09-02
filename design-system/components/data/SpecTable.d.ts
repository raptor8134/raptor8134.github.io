/**
 * Tabular material/test data. First column left-aligned labels, all others
 * right-aligned tabular numerals.
 */
export interface SpecTableProps {
  columns: React.ReactNode[];
  rows: React.ReactNode[][];
  /** Uppercase caption strip above the header row. */
  caption?: React.ReactNode;
  dense?: boolean;
}
export function SpecTable(props: SpecTableProps): JSX.Element;
