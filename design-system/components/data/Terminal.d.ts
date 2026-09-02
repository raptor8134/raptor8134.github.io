/**
 * Console block: green-caret command lines and plain output. The brand's signature
 * device — use once per page, in the hero or an about section.
 */
export interface TerminalProps {
  /** Path shown in the title strip. */
  title?: string;
  lines: Array<string | { cmd?: string; out?: string }>;
  /** Trailing blinking block cursor. */
  cursor?: boolean;
}
export function Terminal(props: TerminalProps): JSX.Element;
