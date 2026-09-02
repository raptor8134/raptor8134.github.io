/**
 * Full-width micrograph backdrop for a title/intro card, seen through the house scrim
 * (rgba(18,18,18,.85)) and a 6px blur. Static — no scroll behaviour. Mount as the first
 * child of a `position:relative` intro/hero container; it fills that container and sits
 * behind the content.
 */
export interface ScrollBackdropProps {
  /** Pool of image sources; one is picked at random per mount. */
  images?: string[];
  /** A single explicit image, taking priority over `images`. */
  image?: string;
  /** Overlay colour above the imagery. Default var(--bg-scrim) = rgba(18,18,18,.85). */
  scrim?: string;
  /** Blur radius applied to the scrim. Default var(--blur-backdrop) = 6px. */
  blur?: string;
  /** Placeholder caption when no image is supplied. */
  label?: string;
}
export function ScrollBackdrop(props: ScrollBackdropProps): JSX.Element;
