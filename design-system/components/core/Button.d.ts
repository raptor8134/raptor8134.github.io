import * as React from "react";

/**
 * Primary action control. Square-ish, uppercase mono label, gradient fill for the
 * single primary action per view.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual weight. One `primary` per view. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Leading node, usually an <Icon />. */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Stretch to container width. */
  full?: boolean;
  /** Render as another tag, e.g. "a". */
  as?: "button" | "a";
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
