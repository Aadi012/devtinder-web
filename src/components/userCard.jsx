// src/components/UserCard.jsx
import React, { useMemo, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

/* ICON MAPS (kept minimal) */
const skillIcons = {
  javascript: "🟨",
  react: "⚛️",
  nodejs: "🟩",
  html: "📄",
  css: "🎨",
  mongodb: "🍃",
  python: "🐍",
  dsa: "📘",
};

const vibeIcons = {
  "night coder": "🌙",
  "chai & code": "☕",
  "chai and code": "☕",
  "focus mode": "🎧",
  "pixel-perfect coder": "✨",
};

const UserCard = ({ user, onSwipe, mode = "feed", overlayType = null, overlayOpacity = 0 }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.user);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSkillPopup, setShowSkillPopup] = useState(false);

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    photoURL,
    photo,
    about,
    skills = [],
    occupation,
    interests = [],
    age,
    location,
    vibe,
  } = user;

  const profilePhoto = photoUrl || photoURL || photo;

  const completionScore = useMemo(() => {
    let f = 0;
    if (about) f++;
    if (skills.length) f++;
    if (interests.length) f++;
    if (location) f++;
    if (occupation) f++;
    if (profilePhoto) f++;
    if (age) f++;
    return Math.round((f / 7) * 100);
  }, [about, skills, interests, location, occupation, profilePhoto, age]);

  const isVerified = completionScore >= 75;

  const matchPercentage = useMemo(() => {
    let match = 0;
    const s1 = (currentUser?.skills || []).map((v) => (v || "").toLowerCase());
    const s2 = (skills || []).map((v) => (v || "").toLowerCase());
    if (s1.some((s) => s2.includes(s))) match++;
    const i1 = (currentUser?.interests || []).map((v) => (v || "").toLowerCase());
    const i2 = (interests || []).map((v) => (v || "").toLowerCase());
    if (i1.some((i) => i2.includes(i))) match++;
    return Math.min(97, 60 + match * 20);
  }, [currentUser, skills, interests]);

  // fallback post if onSwipe not provided
  const fallbackPost = (status, userId) => {
    return axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
  };

  const handleButton = (status) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const dir = status === "ignored" ? "left" : status === "superliked" ? "superlike" : "right";

    if (onSwipe) {
      // inform Feed to handle animation & API
      onSwipe(dir, _id);
      // small visual feedback: show overlay briefly (Feed manages overlay via dragging; we mimic quick overlay)
      // (Feed will show toast once animate resolves)
      setTimeout(() => setIsAnimating(false), 700);
    } else {
      // fallback: call API directly if no onSwipe provided
      fallbackPost(status, _id).finally(() => {
        setIsAnimating(false);
      });
    }
  };

  // Overlay visuals (during drag)
  const Overlay = () => {
    if (!overlayType) return null;
    const baseOpacity = overlayOpacity || 0;
    if (overlayType === "like") {
      return (
        <div className="absolute inset-0 flex items-start justify-end pr-6 pt-6 pointer-events-none">
          <div
            className="text-3xl font-extrabold rounded-md px-4 py-2"
            style={{
              transform: `scale(${0.9 + baseOpacity * 0.2}) rotate(${baseOpacity * 6}deg)`,
              background: "linear-gradient(90deg, rgba(236,72,153,0.92), rgba(168,85,247,0.92))",
              color: "white",
              boxShadow: "0 18px 40px rgba(168,85,247,0.14)",
              opacity: Math.min(1, baseOpacity + 0.08),
            }}
          >
            🔗 Pull Request
          </div>
        </div>
      );
    } else if (overlayType === "nope") {
      return (
        <div className="absolute inset-0 flex items-start justify-start pl-6 pt-6 pointer-events-none">
          <div
            className="text-3xl font-extrabold rounded-md px-4 py-2"
            style={{
              transform: `scale(${0.9 + baseOpacity * 0.2}) rotate(${ -baseOpacity * 6 }deg)`,
              background: "rgba(255,255,255,0.92)",
              color: "#ef4444",
              boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
              opacity: Math.min(1, baseOpacity + 0.08),
            }}
          >
            🗑️ Garbage Collector
          </div>
        </div>
      );
    } else if (overlayType === "superlike" || overlayType === "superlike-drag") {
      return (
        <div className="absolute inset-0 flex items-start justify-center pt-6 pointer-events-none">
          <div
            className="text-3xl font-extrabold rounded-md px-4 py-2 flex items-center gap-2"
            style={{
              transform: `translateY(${ -baseOpacity * 10 }px) scale(${0.95 + baseOpacity * 0.18})`,
              background: "linear-gradient(90deg,#fef3c7,#fde68a)",
              color: "#92400e",
              boxShadow: "0 18px 40px rgba(250,204,21,0.12)",
              opacity: Math.min(1, baseOpacity + 0.08),
            }}
          >
            ✨ Priority Merge
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Skill popup */}
      {showSkillPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl">
            <h3 className="text-lg font-bold mb-3">All Skills</h3>
            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto">
              {skills.map((it) => (
                <span key={it} className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-2">
                  <span>{skillIcons[it.toLowerCase()] || "✨"}</span>
                  {it}
                </span>
              ))}
            </div>
            <button onClick={() => setShowSkillPopup(false)} className="mt-4 w-full py-2 rounded-xl bg-indigo-600 text-white">
              Close
            </button>
          </div>
        </div>
      )}

      <div
        className="mx-auto max-w-sm rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl relative"
        style={{ border: "1px solid rgba(255,255,255,0.52)", boxShadow: "0 28px 60px rgba(15,23,42,0.18)" }}
      >
        {/* Overlay visuals (drag) */}
        <Overlay />

        {/* IMAGE */}
        <div className="relative h-96 bg-gray-200">
          {profilePhoto ? (
            <img src={profilePhoto} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-pink-500 to-purple-600 text-white">
              <span className="text-6xl font-bold">{firstName?.[0]?.toUpperCase()}</span>
            </div>
          )}

          {/* bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-36" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,12,0.68) 85%)" }} />

          {/* ROLE pill */}
          {occupation && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.22)" }}>
              {occupation}
            </div>
          )}

          {/* VERIFIED */}
          {isVerified && <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md text-xs font-bold bg-white/90 shadow">✔ Verified</div>}

          {/* AGE + LOCATION (light glass auto width) */}
          {(age || location) && (
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md" style={{ background: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.3)" }}>
              {age} · {location}
            </div>
          )}

          {/* MATCH badge bottom-right (glass circle) */}
          <div className="absolute" style={{ right: 20, bottom: 20 }}>
            <div className="rounded-full flex flex-col items-center justify-center text-gray-800" style={{ width: 52, height: 52, background: "rgba(255,255,255,0.35)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 4px 18px rgba(0,0,0,0.18)" }}>
              <div className="text-[10px] font-semibold">Match</div>
              <div className="text-sm font-bold">{matchPercentage}%</div>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-5 pb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">
            {firstName} {lastName} ✨
          </h2>

          <p className="text-sm text-gray-600 mt-1">{about ? (about.length > 100 ? about.slice(0, 100) + "…" : about) : occupation}</p>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {skills.slice(0, 3).map((sk) => (
                <div key={sk} className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.22)", color: "#5b21b6" }}>
                  {skillIcons[sk.toLowerCase()] || "✨"} {sk}
                </div>
              ))}
              {skills.length > 3 && <button onClick={() => setShowSkillPopup(true)} className="px-2 py-1 rounded-md bg-gray-100 text-xs">+{skills.length - 3}</button>}
            </div>
          )}

          {/* VIBE */}
          {vibe && (
            <div className="mt-3">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.10), rgba(236,72,153,0.08))", border: "1px solid rgba(99,102,241,0.14)", color: "#4338ca" }}>
                {vibeIcons[vibe.toLowerCase()] || "✨"} {vibe}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          {mode === "feed" && (
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={() => handleButton("ignored")} className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow flex items-center justify-center text-xl" aria-label="pass">
                <span className="text-2xl md:text-3xl text-red-500">✖</span>
              </button>

              <button onClick={() => handleButton("superliked")} className="w-20 h-20 md:w-22 md:h-22 rounded-full shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 12px 32px rgba(99,102,241,0.24)" }} aria-label="superconnect">
                <span className="text-4xl md:text-5xl text-white">⭐</span>
              </button>

              <button onClick={() => handleButton("interested")} className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ec4899,#a855f7)", boxShadow: "0 10px 28px rgba(236,72,153,0.2)" }} aria-label="connect">
                <span className="text-2xl md:text-3xl text-white">❤️</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;
