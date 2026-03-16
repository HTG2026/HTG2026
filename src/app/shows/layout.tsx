import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Shows & Performances",
  description:
    "Dr Phillips Center, Kia Center, Hard Rock Live, House of Blues, I-Drive Live. Broadway, concerts, Orlando Magic games. Real dates and ticket links.",
  openGraph: {
    title: "Live Shows | The Happy Traveler",
    description:
      "Dr Phillips Center, Kia Center, Hard Rock Live. Broadway, concerts, Magic games. Real dates & tickets.",
  },
};

export default function ShowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
