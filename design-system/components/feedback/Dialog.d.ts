/** Centred modal with a scrim, hairline header strip and accent glow edge. */
export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  onClose?: () => void;
  footer?: React.ReactNode;
  /** Pixel width. 520 default. */
  width?: number;
  children?: React.ReactNode;
}
export function Dialog(props: DialogProps): JSX.Element;
