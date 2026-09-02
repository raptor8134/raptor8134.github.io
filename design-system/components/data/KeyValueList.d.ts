/** Leader-dotted metadata list: role, dates, materials, methods, client. */
export interface KeyValueListProps {
  items: Array<{ key: React.ReactNode; value: React.ReactNode }>;
  /** Grid columns. 1 for sidebars, 2 for print sheets. */
  columns?: 1 | 2;
}
export function KeyValueList(props: KeyValueListProps): JSX.Element;
