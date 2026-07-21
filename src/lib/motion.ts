import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

if (import.meta.env.DEV) {
  ;(window as unknown as { __ST?: typeof ScrollTrigger }).__ST = ScrollTrigger
}

/**
 * Deterministic entrance reveal: explicit from AND to states so the end value
 * can never be mis-captured, fires once, and leaves no inline styles behind.
 */
export function reveal(
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  vars: { y?: number; stagger?: number; duration?: number; start?: string; delay?: number } = {},
) {
  return gsap.fromTo(
    targets,
    { y: vars.y ?? 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: vars.duration ?? 0.85,
      stagger: vars.stagger ?? 0,
      delay: vars.delay ?? 0,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger,
        start: vars.start ?? 'top 85%',
        once: true,
      },
    },
  )
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
