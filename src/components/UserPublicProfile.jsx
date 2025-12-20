import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

/* ---------------------------------------------
   DEV PERSONA LOGIC
--------------------------------------------- */
const getDevPersona = (skills = []) => {
  const s = skills.map((x) => x.toLowerCase());

  if (s.includes("react") || s.includes("frontend")) {
    return "🌙 Crafting smooth UIs after midnight";
  }

  if (s.includes("node") || s.includes("backend")) {
    return "☕ Scaling APIs with coffee & patience";
  }

  if (s.includes("data structures") || s.includes("dsa")) {
    return "🚀 Optimizing before shipping";
  }

  return "✨ Exploring ideas & building things";
};

/* ---------------------------------------------
   COLLAB REASON LOGIC
--------------------------------------------- */
const getCollabReason = (skills = []) => {
  if (skills.length === 0) {
    return "No skill overlap yet — perfect chance for cross-domain collaboration.";
  }

  if (skills.length === 1) {
    return `You both share ${skills[0]} — a strong starting point to build together.`;
  }

  return `Strong overlap in ${skills
    .slice(0, 2)
    .join(" & ")} — ideal for shipping real projects together.`;
};

/* ---------------------------------------------
   PUBLIC USER PROFILE
--------------------------------------------- */
const UserPublicProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile/${id}`, {
          withCredentials: true,
        });
        setUser(res.data?.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const persona = useMemo(
    () => getDevPersona(user?.skills || []),
    [user]
  );

  const collabReason = useMemo(
    () => getCollabReason(user?.skills || []),
    [user]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">
          Loading developer profile…
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen px-5 sm:px-6 py-14
        bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]
      "
    >
      <div
        className="
          max-w-3xl mx-auto
          bg-white/75 backdrop-blur-xl
          border border-white/40
          rounded-3xl shadow-2xl
          p-7 sm:p-9
          animate-cardPop
        "
      >
        {/* HEADER */}
        <div className="flex items-center gap-5">
          <img
            src={user.photoUrl || "/avatar-fallback.png"}
            className="
              w-20 h-20 rounded-full object-cover
              border-2 border-white shadow-md
            "
            alt={user.firstName}
          />

          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {user.firstName} {user.lastName}{" "}
              <span className="text-green-600">✔</span>
            </h1>

            <p className="text-indigo-600 font-medium">
              {user.occupation || "Developer"}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              📍 {user.location || "Remote"}
            </p>
          </div>
        </div>

        {/* DEV PERSONA */}
        <div
          className="
            mt-5 inline-flex items-center gap-2
            px-4 py-2 rounded-full
            bg-indigo-50 text-indigo-700
            text-sm font-semibold
          "
        >
          {persona}
        </div>

        {/* ABOUT */}
        <div className="mt-7">
          <h3 className="font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-gray-700 leading-relaxed">
            {user.about || "No bio provided."}
          </p>
        </div>

        {/* PRIMARY SKILL */}
        {user.skills?.length > 0 && (
          <div className="mt-7">
            <h3 className="font-semibold text-gray-800 mb-2">
              🏆 Primary Skill
            </h3>
            <span
              className="
                inline-block px-5 py-2 rounded-full
                bg-linear-to-r from-indigo-500 to-blue-500
                text-white font-semibold
                shadow-md
              "
            >
              {user.skills[0]}
            </span>
          </div>
        )}

        {/* SKILLS */}
        {user.skills?.length > 1 && (
          <div className="mt-7">
            <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.slice(1).map((s) => (
                <span
                  key={s}
                  className="
                    px-3 py-1.5 text-sm rounded-full
                    bg-indigo-50 text-indigo-700
                  "
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* WHY COLLAB */}
        <div
          className="
            mt-9 p-5 rounded-2xl
            bg-indigo-50 border border-indigo-100
          "
        >
          <h3 className="font-semibold text-indigo-700 mb-1">
            🤝 Why you should collaborate
          </h3>
          <p className="text-sm text-indigo-700 leading-relaxed">
            {collabReason}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-9 flex flex-col sm:flex-row gap-4">
          <button
            disabled
            className="
              flex-1 py-3 rounded-xl
              bg-gray-200 text-gray-500
              font-semibold cursor-not-allowed
            "
          >
            💬 Messaging coming soon
          </button>

          <Link
            to="/connections"
            className="
              flex-1 text-center py-3 rounded-xl
              bg-indigo-600 text-white
              font-semibold
              hover:bg-indigo-700
              transition
            "
          >
            ← Back to Connections
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPublicProfile;
