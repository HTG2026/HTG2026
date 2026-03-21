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
        <p className="mb-2 text-[.6rem] font-extrabold uppercase tracking-[3px] text-orange">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight text-htdark">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-xl text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
