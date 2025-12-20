const About = () => {
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

      <div className="max-w-5xl mx-auto text-center animate-fadeSlide">

        <h1 className="text-5xl font-extrabold mb-6 
          bg-linear-to-r from-indigo-600 to-blue-500 
          text-transparent bg-clip-text">
          About Homio
        </h1>

        <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-10">
          A new way for developers to meet, collaborate, and build meaningful projects.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Homio empowers developers to connect with like-minded builders, explore 
          collaboration opportunities, discover exciting project ideas, and grow 
          together as part of a global developer community.
          <br /><br />
          Whether you're looking for project partners, mentorship, or inspiration —
          Homio is where those meaningful connections begin.
        </p>

        {/* Purpose Sections */}
        <div className="grid md:grid-cols-3 gap-10 mt-16">

          <div className="bg-white/70 dark:bg-white/10 p-8 rounded-2xl border border-white/20 shadow-lg backdrop-blur-xl">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Developer Connections</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find developers who share your passion, goals, and energy.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-white/10 p-8 rounded-2xl border border-white/20 shadow-lg backdrop-blur-xl">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Build Real Projects</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Collaborate on hackathons, open-source, and startup ideas.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-white/10 p-8 rounded-2xl border border-white/20 shadow-lg backdrop-blur-xl">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Grow Your Network</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join a positive, global, developer-first community.
            </p>
          </div>

        </div>

        {/* Founder Socials */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
            Follow the Founder
          </h2>

          <div className="flex justify-center gap-8 text-4xl">
            <a href="https://github.com/Aadi012" target="_blank" className="hover:scale-125 transition-transform">🐱</a>
            <a href="https://www.linkedin.com/in/aditya-jha-now/" target="_blank" className="hover:scale-125 transition-transform">💼</a>
            <a href="https://twitter.com/AdityaJ20822030" target="_blank" className="hover:scale-125 transition-transform">🐦</a>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-5 mt-14">
          <a
            href="/login"
            className="px-8 py-3 rounded-xl text-white font-bold
            bg-linear-to-r from-indigo-600 to-blue-500 shadow-lg hover:scale-105 transition">
            Login
          </a>

          <a
            href="/signup"
            className="px-8 py-3 rounded-xl font-bold border border-indigo-500 text-indigo-600
            dark:text-indigo-300 dark:border-indigo-300 
            hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
          >
            Signup
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;
