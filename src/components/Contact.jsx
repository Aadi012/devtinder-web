const Contact = () => {
  return (
    <div
      className="
        min-h-screen relative overflow-hidden
        bg-linear-to-br from-pink-100 via-purple-100 to-blue-100
        dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-900 dark:to-black
        px-6 py-24 flex items-center justify-center
      "
    >

      {/* Glows */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 
        w-[650px] h-[650px] bg-linear-to-br from-purple-500/25 to-blue-400/20 
        blur-[160px] -z-10" />

      <div className="absolute bottom-[-200px] right-[-150px]
        w-[500px] h-[500px] bg-linear-to-tr from-pink-400/25 to-purple-400/20
        blur-[150px] -z-10" />

      <div className="max-w-3xl mx-auto text-center animate-fadeSlide">

        <h1 className="text-5xl font-extrabold mb-6 
          bg-linear-to-r from-indigo-600 to-blue-500 
          text-transparent bg-clip-text">
          Contact Us
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Have questions, feedback, or want to collaborate? We're always here to help.
        </p>

        {/* Card */}
        <div className="mt-14 bg-white/70 dark:bg-white/10 backdrop-blur-xl p-10 rounded-2xl 
          border border-white/20 shadow-xl max-w-lg mx-auto space-y-6 text-left">

          <p className="text-lg text-gray-700 dark:text-gray-300">
            📧 <strong>Email:</strong><br />
            <a href="mailto:jhaaditya778@gmail.com" className="text-indigo-600 hover:underline">
              jhaaditya778@gmail.com
            </a>
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            🌐 <strong>Website:</strong><br />
            <a href="https://www.homio.co.in" className="text-indigo-600 hover:underline" target="_blank">
              www.homio.co.in
            </a>
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            📍 <strong>Location:</strong><br />
            India
          </p>

          {/* Socials */}
          <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
            <p>
              💼 <strong>LinkedIn:</strong><br />
              <a href="https://www.linkedin.com/in/aditya-jha-now/" className="text-indigo-600 hover:underline" target="_blank">
                linkedin.com/in/aditya-jha-now
              </a>
            </p>

            <p>
              🐱 <strong>GitHub:</strong><br />
              <a href="https://github.com/Aadi012" className="text-indigo-600 hover:underline" target="_blank">
                github.com/Aadi012
              </a>
            </p>

            <p>
              🐦 <strong>Twitter/X:</strong><br />
              <a href="https://twitter.com/AdityaJ20822030" className="text-indigo-600 hover:underline" target="_blank">
                twitter.com/AdityaJ20822030
              </a>
            </p>
          </div>

        </div>

        {/* CTA */}
        <a
          href="/login"
          className="inline-block mt-12 px-8 py-3 rounded-xl text-white font-bold
          bg-linear-to-r from-purple-600 to-indigo-600 shadow-lg hover:scale-105 transition"
        >
          Go to Login
        </a>

      </div>
    </div>
  );
};

export default Contact;
