const Terms = () => {
  return (
    <div className="
      min-h-screen relative overflow-hidden
      bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]
      px-6 py-24 text-gray-900
    ">

      <div className="max-w-4xl mx-auto">

        <h1 className="
          text-5xl font-extrabold mb-10 text-center
          bg-linear-to-r from-indigo-600 to-pink-600
          text-transparent bg-clip-text
        ">
          Terms & Conditions
        </h1>

        <div className="
          bg-white/25 backdrop-blur-xl p-10 rounded-3xl
          border border-white/30 shadow-xl space-y-10
        ">

          <p className="text-gray-700 text-lg leading-relaxed">
            By using <strong>Homio</strong>, you agree to follow these terms.
            These guidelines ensure a safe, meaningful and productive experience for all developers.
          </p>

          {/* Eligibility — Age restriction removed */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🧑‍💻 User Eligibility
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Homio is intended for developers, students, and technology enthusiasts.
              Users must provide accurate information and follow community guidelines.
            </p>
          </section>

          {/* Community rules */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              📌 Community & Usage Rules
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree NOT to:
              <br />• Harass, abuse, spam, or threaten others  
              <br />• Create fake accounts or impersonate others  
              <br />• Upload harmful code, viruses, or malicious content  
              <br />• Attempt to breach or bypass platform security  
              <br />• Misuse features such as mass requests or automation  
              <br /><br />
              Homio may suspend or restrict accounts that violate these rules.
            </p>
          </section>

          {/* IP Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              © Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Users retain ownership of their projects, ideas, code snippets, and content.
              Homio does not claim rights over user-generated content.
            </p>
          </section>

          {/* Limitation of liability */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              ⚖️ Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Homio provides a platform for collaboration but is not responsible for the outcome of
              partnerships, communication between users, or project results.
            </p>
          </section>

          {/* Hosting + Infra section */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🌐 Infrastructure & Hosting
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Homio operates using:
              <br />• AWS EC2 for backend hosting  
              <br />• Cloudflare for CDN, DDoS protection & performance  
              <br />• MongoDB Atlas for secure database storage  
              <br /><br />
              While we follow industry best practices, uninterrupted service cannot be guaranteed.
            </p>
          </section>

          {/* Reporting */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🚨 Reporting Issues
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Users can report abusive or suspicious behavior by contacting:
              <br /><strong>jhaaditya778@gmail.com</strong>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;
