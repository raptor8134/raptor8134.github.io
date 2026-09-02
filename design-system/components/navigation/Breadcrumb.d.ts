/** Filesystem-style path trail: ~ / work / lattice-inserts. */
export interface BreadcrumbProps {
  items: Array<string | { label: string; href?: string }>;
  /** "lg" makes the path the page title (15px). */
  size?: "sm" | "lg";
}
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
