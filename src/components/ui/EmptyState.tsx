import { type ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon = "🔍",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="mb-4 text-4xl" role="img" aria-hidden>
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-white/50">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
