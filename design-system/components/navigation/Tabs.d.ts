/**
 * Underlined tab strip for switching project categories or CV sections.
 */
export interface TabsProps {
  items: Array<string | { value: string; label: string; count?: number }>;
  value?: string;
  onChange?: (value: string) => void;
}
export function Tabs(props: TabsProps): JSX.Element;
