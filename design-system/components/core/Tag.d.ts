/** Lowercase keyword chip: materials, methods, instruments. Prefixed with #. */
export interface TagProps {
  children?: React.ReactNode;
  selected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}
export function Tag(props: TagProps): JSX.Element;
