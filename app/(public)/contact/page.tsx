export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Contact Us</h1>

        <p className="text-gray-400">
          Have questions or feedback? Send us a message and we will get back to you.
        </p>

        <form className="space-y-4 mt-6">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Message</label>
            <textarea
              rows={5}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
