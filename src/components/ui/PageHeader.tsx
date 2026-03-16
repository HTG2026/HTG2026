import { type ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-10 sm:mb-12">
      {eyebrow && (
        <p className="mb-2 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-teal">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-xl text-sm text-white/50 leading-relaxed">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
