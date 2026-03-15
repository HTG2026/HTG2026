export default function FlightTracker() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Flight Tracker</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Enter a flight number or route to track status in real time.
      </p>
      <div className="max-w-md space-y-4">
        <div>
          <label htmlFor="flight" className="block text-sm font-medium mb-2">
            Flight number (e.g. AA 123)
          </label>
          <input
            id="flight"
            type="text"
            placeholder="AA 123"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Track flight
        </button>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Flight tracking results will appear here. Connect to a flight API to enable live data.
      </p>
    </div>
  );
}
