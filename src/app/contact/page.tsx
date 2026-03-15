export default function Contact() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Have questions or want to share your travel story? Get in touch.
      </p>
      <form className="max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
