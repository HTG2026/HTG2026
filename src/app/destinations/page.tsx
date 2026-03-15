export default function Destinations() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Destinations</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore Central Florida highlights across Orlando, Cocoa, and Tampa.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { area: "Orlando", blurb: "Theme parks, attractions, and family fun." },
          { area: "Cocoa Beach", blurb: "Laid-back surf town and Space Coast launches." },
          { area: "Tampa Bay", blurb: "Waterfront vibes, food, and culture." },
          { area: "Kissimmee", blurb: "Vacation rentals close to the parks." },
          { area: "Winter Park", blurb: "Charming streets, lakes, and dining." },
          { area: "Daytona & New Smyrna", blurb: "Iconic beaches a short drive away." },
        ].map((spot) => (
          <div key={spot.area} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="text-xl font-semibold mb-2">{spot.area}</h2>
            <p className="text-gray-600 dark:text-gray-400">{spot.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
