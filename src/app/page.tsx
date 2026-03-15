import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Happy Traveler</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Discover the best of Central Florida—from Orlando’s theme parks to Cocoa’s beaches and Tampa’s waterfront.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/destinations" className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Destinations</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Explore where to go next.</p>
        </Link>
        <Link href="/blog" className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Blog</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Stories and travel guides.</p>
        </Link>
        <Link href="/flight-tracker" className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Flight Tracker</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track your flights in real time.</p>
        </Link>
        <Link href="/contact" className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get in touch with us.</p>
        </Link>
      </div>
    </div>
  );
}
