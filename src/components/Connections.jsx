import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constant";

/* ---------------------------------------------
   CONNECTION CARD
--------------------------------------------- */
const ConnectionCard = ({ user }) => {
  const navigate = useNavigate();

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    occupation,
    skills = [],
  } = user;

  const hasSkills = skills.length > 0;

  return (
    <div
      className="bg-white/70 backdrop-blur-xl
      border border-white/40
      rounded-2xl
      p-6 sm:p-7
      shadow-lg hover:shadow-xl transition"
    >
      {/* TOP */}
      <div className="flex items-center gap-4">
        <img
          src={
            photoUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={firstName}
          className="w-14 h-14 rounded-full object-cover border border-white"
        />

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {firstName} {lastName}{" "}
            <span className="text-green-600">✔</span>
          </h2>

          {occupation && (
            <p className="text-sm text-indigo-600 font-medium">
              {occupation}
            </p>
          )}
        </div>
      </div>

      {/* INSIGHT */}
      <p className="mt-3 text-sm text-gray-700 flex items-center gap-2">
        {hasSkills ? "💡" : "🚀"}
        <span>
          {hasSkills
            ? `Strong in ${skills.slice(0, 2).join(" & ")}`
            : "No overlap yet — great chance to explore new ideas"}
        </span>
      </p>

      {/* SKILLS */}
      {hasSkills && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2.5 py-1 rounded-md
                bg-indigo-50 text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(`/user/${_id}`)}
          className="flex-1 py-2.5 rounded-xl
          bg-indigo-600 text-white font-medium
          hover:bg-indigo-700 transition"
        >
          View Profile →
        </button>

        <button
          disabled
          className="flex-1 py-2.5 rounded-xl
          bg-white/60 text-gray-500
          border border-white/40 cursor-not-allowed"
        >
          Message (soon)
        </button>
      </div>
    </div>
  );
};

/* ---------------------------------------------
   MAIN CONNECTIONS PAGE
--------------------------------------------- */
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((s) => s.connections);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res.data?.data || []));
      } catch (err) {
        console.error("Failed to fetch connections", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center
      bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
          <p className="text-gray-600 animate-pulse">
            Loading your connections…
          </p>
        </div>
      </div>
    );
  }

  /* EMPTY */
  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center
      text-center px-6
      bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]">
        <h1 className="text-4xl font-extrabold
        bg-linear-to-r from-indigo-600 to-blue-500
        text-transparent bg-clip-text">
          No Connections Yet
        </h1>

        <p className="text-gray-600 mt-3 max-w-md">
          Start connecting with developers and turn ideas into real builds.
        </p>

        <a
          href="/feed"
          className="mt-6 px-6 py-3 rounded-xl
          bg-indigo-600 text-white font-medium
          hover:bg-indigo-700 transition"
        >
          Discover Developers
        </a>
      </div>
    );
  }

  /* MAIN */
  return (
    <div className="min-h-screen pb-24 px-6 relative overflow-hidden
    bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto pt-16 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold
        bg-linear-to-r from-indigo-600 to-blue-500
        text-transparent bg-clip-text">
          Your Connections
        </h1>

        <p className="text-gray-700 mt-2">
          Where builders become collaborators.
        </p>

        <div className="mt-4 inline-block px-4 py-1.5 rounded-full
        bg-white/70 backdrop-blur border border-white/40
        text-sm text-gray-700">
          {connections.length} connection
          {connections.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* LIST */}
      <section className="max-w-3xl mx-auto space-y-6">
        {connections.map((user) => (
          <ConnectionCard key={user._id} user={user} />
        ))}
      </section>
    </div>
  );
};

export default Connections;
