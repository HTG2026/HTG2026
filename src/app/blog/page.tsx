export default function Blog() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Central Florida stories, tips, and guides from the Happy Traveler team.
      </p>
      <ul className="space-y-6">
        <li className="pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">First-time Orlando trip planner</h2>
          <p className="text-gray-600 dark:text-gray-400">How to balance theme parks, downtime, and budget.</p>
        </li>
        <li className="pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">What to pack for Central Florida</h2>
          <p className="text-gray-600 dark:text-gray-400">Stay ready for sun, storms, and long park days.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mb-2">Best day trips from Orlando</h2>
          <p className="text-gray-600 dark:text-gray-400">From Cocoa Beach to Tampa, easy escapes within a short drive.</p>
        </li>
      </ul>
    </div>
  );
}
