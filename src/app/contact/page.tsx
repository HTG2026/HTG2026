export default function Contact() {
  return (
    <div className="py-16 px-6 sm:px-12 max-w-6xl mx-auto bg-htbg">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">Get in Touch</div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4 text-htdark">
        <span className="text-teal">Contact</span>
      </h1>
      <p className="text-slate-600 text-lg max-w-xl mb-12">
        Have questions or want to share your travel story? Get in touch.
      </p>
      <form className="max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-600">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-htdark placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-600">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-htdark placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-600">Message</label>
          <textarea
            id="message"
            rows={4}
            placeholder="Questions about Central Florida? Share your travel story or ask for recommendations…"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-htdark placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-orange text-white font-bold hover:bg-[#e04510] transition-colors"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
