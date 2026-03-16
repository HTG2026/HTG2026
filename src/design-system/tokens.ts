/**
 * Design System Tokens
 * World-class foundation for consistent, scalable UI.
 * Based on 8px base unit, type scale 1.25, WCAG AA contrast.
 */

export const tokens = {
  /** 8px base unit — all spacing derives from this */
  space: {
    0: "0",
    1: "0.25rem",   // 4px
    2: "0.5rem",    // 8px
    3: "0.75rem",   // 12px
    4: "1rem",      // 16px
    5: "1.25rem",   // 20px
    6: "1.5rem",    // 24px
    8: "2rem",      // 32px
    10: "2.5rem",   // 40px
    12: "3rem",     // 48px
    16: "4rem",     // 64px
    20: "5rem",     // 80px
    24: "6rem",     // 96px
  },

  /** Typography scale — 1.25 ratio */
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.8125rem",  // 13px
    base: "0.875rem", // 14px
    md: "1rem",       // 16px
    lg: "1.25rem",    // 20px
    xl: "1.5rem",     // 24px
    "2xl": "2rem",    // 32px
    "3xl": "2.5rem",  // 40px
    "4xl": "3rem",    // 48px
    "5xl": "4rem",    // 64px
  },

  /** Line heights */
  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },

  /** Border radius */
  radius: {
    sm: "0.375rem",   // 6px
    md: "0.5rem",     // 8px
    lg: "0.75rem",    // 12px
    xl: "1rem",       // 16px
    "2xl": "1.25rem", // 20px
    full: "9999px",
  },

  /** Transitions */
  transition: {
    fast: "150ms ease",
    base: "200ms ease",
    slow: "300ms ease",
  },

  /** Z-index scale */
  z: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    toast: 600,
    nav: 800,
    max: 9999,
  },
} as const;
