export default function FlightTracker() {
  return (
    <div className="py-16 px-6 sm:px-12 max-w-6xl mx-auto bg-htbg">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">Track</div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4 text-htdark">
        <span className="text-teal">Flight Tracker</span>
      </h1>
      <p className="text-slate-600 text-lg max-w-xl mb-12">
        Enter a flight number or route to track status in real time. MCO, TPA, and nearby airports.
      </p>
      <div className="max-w-md space-y-4">
        <div>
          <label htmlFor="flight" className="block text-sm font-medium mb-2 text-slate-600">
            Flight number (e.g. AA 123)
          </label>
          <input
            id="flight"
            type="text"
            placeholder="AA 123"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-htdark placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <button
          type="button"
          className="px-6 py-3 rounded-xl bg-orange text-white font-bold hover:bg-[#e04510] transition-colors"
        >
          Track flight
        </button>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Flight tracking results will appear here. Connect to a flight API to enable live data.
      </p>
    </div>
  );
}
