export default function HomeView() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with background to see navbar transparency */}
      <section className="h-screen bg-linear-to-br from-teal-green via-turquoise-blue to-pewter flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome to Gyan Group</h1>
          <p className="text-2xl text-ivory">
            Leading Chemical Industry Solutions
          </p>
        </div>
      </section>

      {/* Content Section to test scroll behavior */}
      <section className="min-h-screen bg-ivory py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-teal-green mb-8">
            Our Expertise
          </h2>
          <div className="space-y-6 text-ebony">
            <p className="text-lg leading-relaxed">
              Gyan Group is a leading manufacturer and supplier of high-quality
              chemical intermediates for pharmaceutical, pigment, and dye
              industries.
            </p>
            <p className="text-lg leading-relaxed">
              With years of experience and state-of-the-art facilities, we
              deliver excellence in every product we manufacture.
            </p>
            <p className="text-lg leading-relaxed">
              Scroll down to see the navbar transform from transparent to solid
              white background with color changes.
            </p>
          </div>
        </div>
      </section>

      {/* Another section for more scroll content */}
      <section className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-turquoise-blue mb-8">
            Quality Assurance
          </h2>
          <div className="space-y-6 text-ebony">
            <p className="text-lg leading-relaxed">
              Our commitment to quality is unwavering. Every product undergoes
              rigorous testing to ensure it meets international standards.
            </p>
            <p className="text-lg leading-relaxed">
              We maintain certifications and follow best practices in
              manufacturing to deliver products that exceed customer
              expectations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
