/**
 * Sticky 56px site header: wordmark left, uppercase nav and one action right.
 */
export interface SiteHeaderProps {
  links: Array<string | { value: string; label: string }>;
  active?: string;
  onNavigate?: (value: string) => void;
  /** Replaces the default "CV" button. */
  action?: React.ReactNode;
}
export function SiteHeader(props: SiteHeaderProps): JSX.Element;
