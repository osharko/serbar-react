export function Classes() {
  return (
    <section id="classes" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-red-900">
          Our Classes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-900">Beginners</h3>
            <p className="text-gray-700">
              Perfect for those starting their martial arts journey. Learn
              fundamental techniques and forms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-900">
              Intermediate
            </h3>
            <p className="text-gray-700">
              Advance your skills with complex forms, sparring, and weapons
              training.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-900">Advanced</h3>
            <p className="text-gray-700">
              Master-level training for dedicated practitioners seeking
              perfection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
