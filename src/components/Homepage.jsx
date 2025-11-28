const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      
      {/* HERO */}
      <section className="text-center py-20 bg-linear-to-b from-blue-100/60 to-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
          Build Meaningful Connections with Homio
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover people, connect effortlessly, and grow your network with a platform designed for genuine connections.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="/signup" className="btn btn-primary px-6">
            Get Started
          </a>
          <a href="/feed" className="btn btn-outline btn-primary px-6">
            Explore Connections
          </a>
        </div>
      </section>

      {/* ABOUT SECTIONS */}
      <section className="py-16 bg-base-200 text-center">
        <h2 className="text-3xl font-bold text-primary">What is Homio?</h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
          A safe and community-driven platform to help people connect with 
          others who share similar interests, goals, and values.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-base-100">
        <h2 className="text-3xl font-bold text-center text-primary">How Homio Works</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-6xl mx-auto px-6">
          {[
            { title: "Create Profile", desc: "Set up your profile with basic details." },
            { title: "Explore People", desc: "Find users with shared interests." },
            { title: "Send Requests", desc: "Connect with people who matter." },
            { title: "Grow Network", desc: "Collaborate and thrive together." },
          ].map((step, idx) => (
            <div key={idx} className="p-6 bg-base-200 border border-base-300 rounded-xl shadow">
              <h3 className="text-lg font-bold text-primary">{idx + 1}. {step.title}</h3>
              <p className="mt-2 text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-linear-to-t from-blue-100/50 to-white">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Start Your Journey with Homio
        </h2>
        <p className="mt-3 text-gray-600">
          Join thousands who are building meaningful networks.
        </p>
        <a href="/signup" className="btn btn-primary mt-6 px-8">
          Join Now
        </a>
      </section>

    </div>
  );
};

export default HomePage;
