"use client";

interface RatingBadgeProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showBubble?: boolean;
}

export default function RatingBadge({ rating, reviewCount, size = "md", showBubble = true }: RatingBadgeProps) {
  const sizeClass = size === "sm" ? "text-xs" : "text-sm";
  const bubbleClass = size === "sm" ? "w-7 h-7" : "w-9 h-9";

  return (
    <div className="flex items-center gap-2">
      {showBubble && (
        <div
          className={`${bubbleClass} rounded-lg flex items-center justify-center font-bold bg-teal/20 text-teal border border-teal/30 ${sizeClass}`}
        >
          {rating.toFixed(1)}
        </div>
      )}
      <div className="flex items-center gap-1">
        <span className={`font-semibold text-white ${sizeClass}`}>{rating.toFixed(1)}</span>
        <span className="text-gold text-[0.65rem] sm:text-[0.7rem]">★</span>
      </div>
      {reviewCount !== undefined && (
        <span className={`text-white/45 ${size === "sm" ? "text-[0.65rem]" : "text-[0.72rem]"}`}>
          ({reviewCount.toLocaleString()} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
