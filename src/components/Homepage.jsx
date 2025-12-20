// Homepage.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * TypingTerminal
 * - types lines one by one with small delay & blinking cursor
 */
const TypingTerminal = ({ lines, speed = 30, lineDelay = 700 }) => {
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const cursorVisible = useRef(true);

  // blinking cursor
  useEffect(() => {
    const t = setInterval(() => {
      cursorVisible.current = !cursorVisible.current;
      // force update
      setCurrentText((s) => s);
    }, 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setDone(true);
      return;
    }

    if (charIndex <= lines[lineIndex].length) {
      const id = setTimeout(() => {
        setCurrentText(
          (prev) =>
            prev.slice(0, prev.lastIndexOf("\n") + 1) +
            lines[lineIndex].slice(0, charIndex)
        );
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(id);
    } else {
      // pause, then move to next line
      const id = setTimeout(() => {
        setCurrentText((prev) => prev + "\n");
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(id);
    }
  }, [charIndex, lineIndex, lines, speed, lineDelay]);

  // when lineIndex increments, we want to append next line placeholder
  useEffect(() => {
    if (lineIndex < lines.length && lineIndex > 0) {
      setCharIndex(0);
    }
  }, [lineIndex]);

  return (
    <div className="font-mono text-sm text-green-300 bg-transparent">
      <pre className="whitespace-pre-wrap wrap-break-word leading-6">
        {currentText}
        {!done && (
          <span className="inline-block w-3">
            {cursorVisible.current ? "▌" : " "}
          </span>
        )}
      </pre>
    </div>
  );
};

/* -------------------- motion variants -------------------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const floatVariant = {
  visible: {
    y: [0, -6, 0],
    transition: { duration: 5, ease: "easeInOut", loop: Infinity },
  },
};

export default function Homepage() {
  const codeLines = [
    "├─ src/",
    "├── feed.jsx",
    "├── matchEngine.js",
    "└── profileCard.jsx",
    "",
    "├─ public/",
    "└── index.html",
    "",
    "├─ collaborators.json",
    "├─ README.md",
    "└─ package.json",
  ];

  const terminalLines = [
    "$ npx create-homio",
    "✔ Initializing workspace...",
    "✔ Setting up developer profile...",
    "✔ Matching collaborators...",
    "✔ You're ready to build 🚀",
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)] text-gray-900 selection:bg-indigo-200/30 selection:text-black">

      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
        variants={fadeInUp}
        className="max-w-6xl mx-auto text-center pt-28 pb-8 px-6"
      >
        <h1 className="text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-indigo-600 drop-shadow-sm">
          Build. Collaborate. Grow.
        </h1>

        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          Homio connects developers based on skills, goals, interests and ambition.
          Find collaborators, build projects together, and grow your tech circle — all with a modern, swipe-based interface.
        </p>

        <a
          href="/feed"
          className="inline-block mt-10 px-12 py-4 rounded-2xl text-white text-lg font-semibold
          bg-linear-to-r from-indigo-600 to-pink-600 shadow-xl hover:scale-105 transition-transform"
        >
          Explore Developers
        </a>
      </motion.section>

      {/* WHY HOMIO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.05}
        variants={fadeInUp}
        className="max-w-6xl mx-auto mt-14 px-6"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-linear-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
          Why Developers Choose Homio
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🧠", title: "Skill-Based Matching", desc: "Find developers who match your tech stack and goals." },
            { icon: "🚀", title: "Build Real Projects", desc: "Match with collaborators for hackathons, startups or side projects." },
            { icon: "🌍", title: "Expand Your Network", desc: "Connect with developers across different levels & backgrounds." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.1 + i * 0.08}
              variants={fadeInUp}
              className="bg-white/25 backdrop-blur-xl p-8 rounded-2xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-2xl transition text-center"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* HOW HOMIO WORKS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.12}
        variants={fadeInUp}
        className="max-w-6xl mx-auto mt-16 px-6"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-linear-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
          How Homio Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Create Profile", desc: "Add your tech stack, experience & goals." },
            { step: "2", title: "Swipe Developers", desc: "Find people who match your ambitions." },
            { step: "3", title: "Match Instantly", desc: "Connections form when interest is mutual." },
            { step: "4", title: "Collaborate & Build", desc: "Work together, learn together, grow together." }
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.15 + i * 0.06}
              variants={fadeInUp}
              className="bg-white/25 backdrop-blur-xl p-8 rounded-2xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-2xl transition"
            >
              <div className="text-3xl font-black text-indigo-600 mb-3">{s.step}</div>
              <h4 className="text-lg font-semibold mb-2">{s.title}</h4>
              <p className="text-gray-700">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ABOUT HOMIO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.18}
        variants={fadeInUp}
        className="max-w-4xl mx-auto mt-16 px-6 text-center"
      >
        <h2 className="text-4xl font-extrabold mb-6 bg-linear-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
          What is Homio?
        </h2>

        <div className="bg-white/25 backdrop-blur-xl p-8 rounded-2xl border border-white/30 shadow-xl">
          <p className="text-gray-700 text-lg leading-relaxed">
            Homio is a modern networking platform crafted specifically for developers.
            It helps people connect through shared skills, goals, and project interests.
            <br /><br />
            Whether you're exploring side projects, preparing for hackathons,
            or looking for like-minded collaborators — Homio makes it simple, fun, and meaningful.
            <br /><br />
            It’s not a replacement for other communities. It’s an additional space built to inspire creativity, teamwork, and real developer collaboration.
          </p>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.20}
        variants={fadeInUp}
        className="max-w-5xl mx-auto mt-16 px-6"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-linear-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
          What Developers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Rahul Sharma", role: "Full-Stack Developer", quote: "Found my hackathon teammate — Homio is brilliant!" },
            { name: "Aditi Singh", role: "UI/UX • React", quote: "Finally a platform where developers feel understood." },
            { name: "Mark Allan", role: "Backend Engineer", quote: "Matched with someone who shares my startup idea. Unreal!" }
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.22 + i * 0.05}
              variants={fadeInUp}
              className="bg-white/25 backdrop-blur-xl p-8 rounded-2xl border border-white/30 shadow-xl"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <p className="font-bold text-gray-900">{t.name}</p>
              <p className="text-sm text-gray-600">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* DEVELOPER SHOWCASE */}
      <section className="max-w-5xl mx-auto mt-28 px-6 pb-40">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-10 bg-linear-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text"
        >
          Built for Developers — By Developers
        </motion.h2>

        {/* VS CODE MOCKUP (dark glass) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/95 backdrop-blur-xl text-gray-200 rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
        >
          {/* VS Code Top Bar with animated file highlight */}
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="ml-4 text-sm opacity-70">homio-workspace — VS Code</span>

            {/* fake tabs */}
            <div className="ml-auto flex gap-2 items-center">
              <motion.div
                animate={{ scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="px-3 py-1 rounded-md bg-gray-700/60 text-xs"
              >
                Explorer
              </motion.div>
              <div className="px-3 py-1 rounded-md text-xs text-gray-400">Search</div>
              <div className="px-3 py-1 rounded-md text-xs text-gray-400">Source</div>
            </div>
          </div>

          {/* Code area + animated file highlight */}
          <div className="p-6 font-mono text-sm space-y-2 relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0.85, rotate: -0.3 },
                visible: {
                  opacity: [0.85, 1, 0.85],
                  rotate: [-0.3, 0, -0.3],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                },
              }}
              className="absolute inset-0 pointer-events-none rounded-2xl"
            />
            <p className="text-blue-400">├─ src/</p>
            <motion.p
              className="ml-6 text-indigo-300"
              animate={{ backgroundColor: ["rgba(79,70,229,0)", "rgba(79,70,229,0.06)", "rgba(79,70,229,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              ├── feed.jsx
            </motion.p>
            <motion.p
              className="ml-6 text-indigo-300"
              animate={{ backgroundColor: ["rgba(99,102,241,0)", "rgba(99,102,241,0.06)", "rgba(99,102,241,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              ├── matchEngine.js
            </motion.p>
            <motion.p
              className="ml-6 text-indigo-300"
              animate={{ backgroundColor: ["rgba(99,102,241,0)", "rgba(99,102,241,0.06)", "rgba(99,102,241,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            >
              └── profileCard.jsx
            </motion.p>

            <p className="text-blue-400 mt-2">├─ public/</p>
            <p className="ml-6 text-indigo-300">└── index.html</p>

            <p className="text-blue-400 mt-2">├─ collaborators.json</p>
            <p className="text-blue-400">├─ README.md</p>
            <p className="text-blue-400">└─ package.json</p>
          </div>
        </motion.div>

        {/* Terminal with typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-black/90 text-green-400 font-mono text-sm p-6 rounded-2xl shadow-2xl border border-gray-800 mt-8"
        >
          <div className="text-gray-500 mb-2">~/homio</div>
          <TypingTerminal lines={terminalLines} speed={28} lineDelay={700} />
        </motion.div>
      </section>
    </div>
  );
}
