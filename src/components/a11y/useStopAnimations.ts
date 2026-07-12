import { useSyncExternalStore } from 'react'
import { useReducedMotion } from 'framer-motion'
import { getA11ySettings, subscribeA11y } from './a11yStore'

/**
 * True if animations should be stopped — either because the OS
 * "prefers-reduced-motion" setting is on, or the user enabled
 * "Stop Animations" in the site's accessibility widget.
 *
 * Framer Motion's own `useReducedMotion()` only tracks the OS setting and
 * ignores `MotionConfig`'s `reducedMotion` prop for manually-branched
 * `animate={...}` props, so components that want to honor the a11y widget
 * must check this hook instead.
 */
export function useStopAnimations(): boolean {
  const osReduced = useReducedMotion()
  const appStop = useSyncExternalStore(subscribeA11y, () => getA11ySettings().stopAnimations)
  return Boolean(osReduced) || appStop
}
