import { BRAND_NAME } from "../utils/constant";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
        relative mt-20
        bg-linear-to-br from-pink-50 via-purple-50 to-blue-50
        dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
        border-t border-white/30 dark:border-gray-700
        backdrop-blur-xl
      "
    >
      {/* Glow */}
      <div
        className="
          absolute top-[-150px] left-1/2 -translate-x-1/2
          w-[500px] h-[500px]
          bg-linear-to-br from-pink-400/25 via-purple-400/25 to-indigo-400/25
          blur-[140px] opacity-80 pointer-events-none -z-10
        "
      />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                w-12 h-12 rounded-xl
                bg-linear-to-br from-pink-500 via-purple-500 to-indigo-500
                flex items-center justify-center
                text-white font-extrabold text-xl
                shadow-lg
              "
            >
              H
            </div>

            <h2
              className="
                text-3xl font-extrabold
                bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600
                text-transparent bg-clip-text
              "
            >
              {BRAND_NAME}
            </h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-3 max-w-sm">
            Build meaningful developer connections through collaboration and
            community.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-6">
            <a
              href="https://github.com/Aadi012"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow hover:scale-110 transition"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://www.linkedin.com/in/aditya-jha-now/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow hover:scale-110 transition text-blue-600"
            >
              <FaLinkedin size={22} />
            </a>

            <a
              href="https://twitter.com/AdityaJ20822030"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow hover:scale-110 transition text-sky-500"
            >
              <FaTwitter size={22} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><a href="/" className="link-hover-gradient">Home</a></li>
            <li><a href="/about" className="link-hover-gradient">About</a></li>
            <li><a href="/contact" className="link-hover-gradient">Contact</a></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-200">
            Legal
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><a href="/privacy-policy" className="link-hover-gradient">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions" className="link-hover-gradient">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className="
          bg-white/40 dark:bg-gray-800/40
          border-t border-white/30 dark:border-gray-700
          py-4 text-center text-sm
          text-gray-700 dark:text-gray-300
        "
      >
        © {new Date().getFullYear()} {BRAND_NAME} — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
