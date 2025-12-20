// src/components/Requests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../utils/constant";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

/* ======================================================
   MINI DEV CARD — 420px Apple-Style Width
====================================================== */

const MiniDevCard = ({ req, onAccept, onReject, leaving }) => {
  const user = req.fromUserId;
  const avatar =
    user.photoUrl || user.photoURL || user.photo || "/default-avatar.png";

  const skills = user.skills || [];
  const mySkills = [];
  const mutual = skills.filter((s) =>
    mySkills.map((x) => x?.toLowerCase()).includes(s.toLowerCase())
  );

  const vibe = user.vibe;
  const role = user.occupation;
  const about = user.about;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: leaving === "accepted" ? 240 : leaving === "rejected" ? -240 : 0,
        scale: 0.9,
      }}
      transition={{ duration: 0.34, ease: "easeOut" }}
      className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition mx-auto"
      style={{ maxWidth: "420px" }}
    >
      {/* TOP: Avatar + Name */}
      <div className="flex items-center gap-4">
        <div className="rounded-full p-1 bg-linear-to-br from-indigo-500 to-pink-500 shadow">
          <img
            src={avatar}
            className="w-14 h-14 rounded-full object-cover border-4 border-white shadow"
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-1">
            {user.firstName} {user.lastName}
            <span className="text-xs">✔️</span>
          </h2>

          {role && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200">
              {role}
            </span>
          )}
        </div>
      </div>

      {/* Mutual Skills */}
      <div className="text-sm text-gray-700 mt-3 pl-1">
        {mutual.length > 0 ? (
          <>
            <span className="font-semibold">{mutual.length} mutual skills · </span>
            {mutual.slice(0, 3).join(", ")}
            {mutual.length > 3 && ` +${mutual.length - 3}`}
          </>
        ) : (
          <span className="opacity-70 italic">
            No mutual skills yet — great chance to collaborate!
          </span>
        )}
      </div>

      {/* About */}
      {about && (
        <p className="text-gray-600 text-sm leading-snug mt-2 pl-1 line-clamp-2">
          {about}
        </p>
      )}

      {/* Vibe */}
      {vibe && (
        <span
          className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background:
              "linear-gradient(90deg, rgba(99,102,241,0.12), rgba(236,72,153,0.10))",
            border: "1px solid rgba(99,102,241,0.15)",
            color: "#4338ca",
          }}
        >
          {vibe}
        </span>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 pt-4">
        {/* DECLINE */}
        <button
          onClick={onReject}
          className="flex-1 py-2.5 rounded-xl bg-red-100/50 backdrop-blur-md border border-red-200 text-red-600 font-medium shadow hover:bg-red-100 transition"
        >
          ❌ Decline
        </button>

        {/* ACCEPT */}
        <button
          onClick={onAccept}
          className="flex-1 py-2.5 rounded-xl text-white font-medium shadow-lg hover:scale-[1.03] transition"
          style={{
            background: "linear-gradient(135deg,#a855f7,#ec4899)",
          }}
        >
          🤝 Accept
        </button>
      </div>
    </motion.div>
  );
};

/* ======================================================
   MAIN REQUESTS PAGE
====================================================== */

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((s) => s.requests);
  const [leaving, setLeaving] = useState({ id: null, status: null });

  const { toasts, showToast } = useToast();

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        dispatch(addRequests(res?.data?.data || []));
      } catch (err) {
        console.error("Failed fetching requests:", err);
      }
    };

    fetchReq();
  }, []);

  const review = async (status, reqId, firstName) => {
    setLeaving({ id: reqId, status });

    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${reqId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(reqId));

      showToast(
        status === "accepted"
          ? `Connected with ${firstName} 🤝`
          : `Rejected ${firstName} ❌`
      );
    } catch {
      showToast("Something went wrong 😕");
    } finally {
      setTimeout(() => setLeaving({ id: null, status: null }), 350);
    }
  };

  /* EMPTY UI */
  if (!requests || requests.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          No Requests Yet
        </h1>
        <p className="text-gray-700 mt-2">You're all caught up!</p>
        <Toast toasts={toasts} />
      </div>
    );

  /* MAIN UI */
  return (
    <div className="min-h-screen px-6 pb-20 bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)] relative overflow-hidden">
      {/* Header */}
      <div className="max-w-3xl mx-auto pt-16 pb-4 text-center">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Collaboration Requests
        </h1>
        <p className="mt-2 text-gray-700 text-sm">
          Incoming build invites. Review, connect, and create something legendary.
        </p>
      </div>

      <Toast toasts={toasts} />

      {/* LIST */}
      <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-6">
        <AnimatePresence>
          {requests.map((req) => (
            <MiniDevCard
              key={req._id}
              req={req}
              leaving={leaving.id === req._id ? leaving.status : null}
              onAccept={() =>
                review("accepted", req._id, req.fromUserId.firstName)
              }
              onReject={() =>
                review("rejected", req._id, req.fromUserId.firstName)
              }
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Requests;
