export default function Contact() {
  return (
    <div className="py-16 px-6 sm:px-12 max-w-6xl mx-auto">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">Get in Touch</div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4">
        <span className="text-teal">Contact</span>
      </h1>
      <p className="text-white/50 text-lg max-w-xl mb-12">
        Have questions or want to share your travel story? Get in touch.
      </p>
      <form className="max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/70">Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-htcard text-white placeholder:text-white/25"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/70">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-htcard text-white placeholder:text-white/25"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/70">Message</label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-htcard text-white placeholder:text-white/25"
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
