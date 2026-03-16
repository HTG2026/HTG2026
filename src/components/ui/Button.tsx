"use client";

import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal/90 active:bg-teal/80 border-teal focus-visible:ring-teal",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 border-white/20 focus-visible:ring-white/30",
  ghost:
    "bg-transparent text-white/70 hover:bg-white/10 hover:text-white border-transparent focus-visible:ring-white/20",
  danger:
    "bg-red/20 text-red hover:bg-red/30 border-red/40 focus-visible:ring-red/50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[0.75rem] rounded-lg",
  md: "px-4 py-2 text-[0.8125rem] rounded-xl",
  lg: "px-6 py-3 text-[0.9375rem] rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-htdark disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
