const PrivacyPolicy = () => {
  return (
    <div className="
      min-h-screen relative overflow-hidden
      bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]
      px-6 py-24 text-gray-900
    ">

      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="
          text-5xl font-extrabold mb-10 text-center
          bg-linear-to-r from-indigo-600 to-pink-600
          text-transparent bg-clip-text
        ">
          Privacy Policy
        </h1>

        <div className="
          bg-white/25 backdrop-blur-xl p-10 rounded-3xl
          border border-white/30 shadow-xl space-y-10
        ">

          <p className="text-gray-700 text-lg leading-relaxed">
            Your privacy matters to us. This Privacy Policy explains how
            <strong> Homio </strong> collects, uses, and protects your information
            while providing a modern platform for developers to connect and collaborate.
          </p>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              📌 Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To provide a personalized experience, we may collect:
              <br />• Name, email, and account information  
              <br />• Profile details such as skills, interests, location (approx.), and bio  
              <br />• Swipe activity, connection requests, and interaction patterns  
              <br />• Device type, browser information, and general usage statistics  
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🌐 Third-Party Services We Use
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Homio uses trusted third-party services to ensure security, speed, and reliability:
              <br />• <strong>Cloudflare</strong> — CDN, security, and traffic optimization  
              <br />• <strong>MongoDB Atlas</strong> — secure cloud database storage  
              <br />• <strong>AWS EC2</strong> — backend hosting infrastructure  
              <br /><br />
              These services follow industry-grade security practices and only process
              data necessary for platform functionality.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🍪 Cookies & Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Homio uses minimal cookies strictly for:
              <br />• Authentication  
              <br />• Session management  
              <br />• Improving platform performance  
              <br /><br />
              We do <strong>not</strong> use advertising cookies or third-party trackers.
            </p>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🔐 How We Use Your Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information is used to:
              <br />• Match you with compatible developers  
              <br />• Improve platform recommendations  
              <br />• Maintain security & prevent misuse  
              <br />• Enhance overall user experience  
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🗂️ Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your data only as long as your account remains active
              or as required for legitimate business and security purposes.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🧾 Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You may contact us to:
              <br />• Update your profile information  
              <br />• Request data export  
              <br />• Request account deletion (handled manually via email)  
              <br /><br />
              Email: <strong>jhaaditya778@gmail.com</strong>
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🔒 Security Measures
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use encryption, secure servers, Cloudflare protection,
              and industry-standard best practices to safeguard your data.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
