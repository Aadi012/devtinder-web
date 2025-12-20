// src/components/Feed.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { addConnections } from "../utils/connectionSlice";
import { addRequests } from "../utils/requestSlice";
import LoadingSpinner from "./LoadingSpinner";
import UserCard from "./userCard";

const Toast = ({ toast, onClose }) => {
  // toast: { key, icon, title, subtitle, visible }
  if (!toast?.visible) return null;

  return (
    <motion.div
      initial={{ y: -36, opacity: 0 }}
      animate={{ y: 10, opacity: 1 }}
      exit={{ y: -36, opacity: 0 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
      className="fixed left-1/2 -translate-x-1/2 top-6 z-50"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="px-5 py-3 rounded-2xl backdrop-blur-md flex items-start gap-3"
        style={{
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 10px 30px rgba(2,6,23,0.35)",
          minWidth: 260,
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 22 }}>{toast.icon}</span>
        </div>

        <div className="flex-1">
          <div className="text-sm font-semibold text-white leading-tight">{toast.title}</div>
          {toast.subtitle && <div className="text-xs text-white/75 mt-0.5">{toast.subtitle}</div>}
        </div>

        {/* close optional (not strictly necessary) */}
        <button
          onClick={onClose}
          className="text-white/60 text-sm ml-3"
          style={{ pointerEvents: "auto" }}
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((s) => s.feed) || [];
  const connections = useSelector((s) => s.connections) || [];
  const requests = useSelector((s) => s.requests) || [];
  const user = useSelector((s) => s.user);
  const userData = user?.data ? user.data : user;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentAction, setRecentAction] = useState(null);
  const [toast, setToast] = useState({ visible: false, key: null, icon: "", title: "", subtitle: "" });

  const dragLockRef = useRef({});
  const controls = useAnimation();
  const [overlay, setOverlay] = useState({ type: null, opacity: 0 });

  useEffect(() => {
    getFeed();
    fetchConnectionsRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/feed?page=1&limit=50`, { withCredentials: true });
      dispatch(addFeed(res?.data?.data || []));
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load feed.");
    } finally {
      setLoading(false);
    }
  };

  const fetchConnectionsRequests = async () => {
    try {
      const [conRes, reqRes] = await Promise.allSettled([
        axios.get(`${BASE_URL}/user/connections`, { withCredentials: true }),
        axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true }),
      ]);
      if (conRes.status === "fulfilled") dispatch(addConnections(conRes.value.data?.data || []));
      if (reqRes.status === "fulfilled") dispatch(addRequests(reqRes.value.data?.data || []));
    } catch (_) {}
  };

  const filteredFeed = useMemo(() => {
    if (!Array.isArray(feed)) return [];
    const connectedIds = new Set(connections.map((c) => c?._id));
    const requestedIds = new Set();
    (requests || []).forEach((r) => {
      if (r?._id) requestedIds.add(r._id);
      if (r?.fromUserId?._id) requestedIds.add(r.fromUserId._id);
      if (r?.toUserId?._id) requestedIds.add(r.toUserId._id);
      if (typeof r?.fromUserId === "string") requestedIds.add(r.fromUserId);
      if (typeof r?.toUserId === "string") requestedIds.add(r.toUserId);
    });

    return feed.filter((u) => {
      if (!u?._id) return false;
      if (u._id === userData?._id) return false;
      if (connectedIds.has(u._id)) return false;
      if (requestedIds.has(u._id)) return false;
      return true;
    });
  }, [feed, connections, requests, userData]);

  const nearbyCount = filteredFeed.length;

  // parallax tilt
  const parallax = (x) => {
    const max = 12;
    return Math.max(-max, Math.min(max, (x / 300) * max));
  };

  const onDrag = (info) => {
    const x = info.offset.x;
    const abs = Math.min(1, Math.abs(x) / 150);
    if (x > 10) setOverlay({ type: "like", opacity: abs });
    else if (x < -10) setOverlay({ type: "nope", opacity: abs });
    else if (info.offset.y < -20) setOverlay({ type: "superlike-drag", opacity: Math.min(1, Math.abs(info.offset.y) / 200) });
    else setOverlay({ type: null, opacity: 0 });

    controls.set({ rotate: parallax(x) });
  };

  const onDragEnd = async (info, cardUser) => {
    setOverlay({ type: null, opacity: 0 });
    controls.set({ rotate: 0 });
    if (!cardUser?._id) return;
    const { offset, velocity } = info;
    if (offset.y < -180 || velocity.y < -700) return animateAndResolve("superlike", cardUser);
    if (offset.x > 120 || velocity.x > 700) return animateAndResolve("interested", cardUser);
    if (offset.x < -120 || velocity.x < -700) return animateAndResolve("ignored", cardUser);
    controls.start({ x: 0, y: 0, rotate: 0, transition: { type: "spring", stiffness: 480 } });
  };

  const sendReq = async (status, id) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${id}`, {}, { withCredentials: true });
    } catch (err) {
      // ignore for now
      console.warn("sendReq error", err?.message || err);
    }
  };

  // developer-humor toast mapping
  const toastForStatus = {
    interested: { icon: "🔗", title: "Pull Request Sent!", subtitle: "You've sent a collaboration request." },
    superlike: { icon: "✨", title: "Priority Merge Request!", subtitle: "You stood out — priority invite sent." },
    superliked: { icon: "✨", title: "Priority Merge Request!", subtitle: "You stood out — priority invite sent." },
    ignored: { icon: "🗑️", title: "Garbage Collector Activated.", subtitle: "Removed from your suggestions." },
    passed: { icon: "🗑️", title: "Garbage Collector Activated.", subtitle: "Removed from your suggestions." },
  };

  const showToast = (status) => {
    const t = toastForStatus[status] || { icon: "ℹ️", title: "Done", subtitle: "" };
    const key = `${status}-${Date.now()}`;
    setToast({ visible: true, key, icon: t.icon, title: t.title, subtitle: t.subtitle });
    setTimeout(() => setToast((s) => (s.key === key ? { ...s, visible: false } : s)), 1300);
  };

  const animateAndResolve = async (status, cardUser) => {
    const id = cardUser._id;
    if (dragLockRef.current[id]) return;
    dragLockRef.current[id] = true;

    let anim =
      status === "interested"
        ? { x: 1000, rotate: 14, opacity: 0, transition: { duration: 0.45 } }
        : status === "ignored"
        ? { x: -1000, rotate: -14, opacity: 0, transition: { duration: 0.45 } }
        : { y: -900, scale: 0.92, opacity: 0, transition: { duration: 0.55 } };

    setRecentAction({
      type: status === "interested" ? "like" : status === "superlike" ? "superlike" : "pass",
      text:
        status === "interested"
          ? "Connected!"
          : status === "superlike"
          ? "Super Connected!"
          : "Passed",
    });

    setTimeout(() => setRecentAction(null), 1200);

    // animate card
    await controls.start(anim);

    // api call
    await sendReq(status === "superlike" ? "superliked" : status, id);

    // show developer toast
    showToast(status === "superlike" ? "superlike" : status);

    // remove from feed
    dispatch(removeUserFromFeed(id));

    // reset
    setTimeout(() => {
      delete dragLockRef.current[id];
      controls.set({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
    }, 280);
  };

  const handleSwipe = (dir, id) => {
    const cardUser = filteredFeed.find((u) => u._id === id);
    if (!cardUser) {
      dispatch(removeUserFromFeed(id));
      return;
    }
    if (dir === "right") animateAndResolve("interested", cardUser);
    else if (dir === "left") animateAndResolve("ignored", cardUser);
    else if (dir === "superlike") animateAndResolve("superlike", cardUser);
  };

  // LOADING / ERROR / EMPTY UI (unchanged)
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-pink-100 via-purple-50 to-indigo-100">
        <LoadingSpinner />
        <p className="mt-4 text-gray-700">Finding amazing developers…</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-linear-to-br from-pink-100 via-purple-50 to-indigo-100">
        <div className="p-8 bg-white/80 rounded-3xl shadow-xl text-center">
          <h2 className="text-xl font-bold mb-3">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={getFeed} className="px-6 py-2 rounded-full bg-linear-to-r from-pink-500 to-purple-500 text-white shadow">
            Try Again
          </button>
        </div>
      </div>
    );

  if (!filteredFeed.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-100 via-purple-50 to-indigo-100 p-8">
        <div className="p-10 bg-white/80 rounded-3xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-2">All caught up!</h2>
          <p className="text-gray-600 mb-6">Check back later.</p>
          <button onClick={getFeed} className="px-8 py-3 rounded-full bg-linear-to-r from-pink-500 to-purple-500 text-white shadow-lg">
            Refresh
          </button>
        </div>
      </div>
    );

  const stackUsers = filteredFeed.slice(0, 3);
  const topUser = stackUsers[0];

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* BG blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 -left-10 w-56 h-56 bg-pink-300 rounded-full blur-3xl" />
        <div className="absolute top-28 right-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-indigo-300 rounded-full blur-3xl" />
      </div>

      {/* Toast */}
      <Toast
        toast={toast}
        onClose={() => setToast((s) => ({ ...s, visible: false }))}
      />

      <div className="relative z-10 flex flex-col items-center py-10 px-4">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-center bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Find Minds That Build With You.
        </h1>

        <p className="mt-2 text-center text-gray-700 text-lg font-semibold">
          Swipe. Connect. Build something extraordinary.
        </p>

        {/* CHIPS (super close) */}
        <div className="mt-3 mb-1 w-full max-w-md flex items-center justify-between px-1">
          <div className="px-3 py-1.5 rounded-full text-sm font-semibold text-gray-800 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)" }}>
            📍 {nearbyCount} devs near you
          </div>

          <div className="px-4 py-1.5 rounded-full text-sm font-semibold text-white shadow" style={{ background: "linear-gradient(135deg,#ec4899,#a855f7)" }}>
            👋 Welcome back, {userData?.firstName || "Dev"}!
          </div>
        </div>

        {/* CARD STACK */}
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md h-[580px] mt-1">
          {/* Ghosts */}
          {stackUsers.slice(1).map((usr, idx) => {
            const depth = idx + 1;
            return (
              <div
                key={`ghost-${usr._id}`}
                className="absolute inset-x-0 mx-auto top-0 rounded-3xl pointer-events-none"
                style={{
                  transform: `translateY(${18 + depth * 14}px) scale(${1 + depth * 0.015})`,
                  opacity: 0.92 - depth * 0.22,
                  height: "540px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 24px 45px rgba(0,0,0,0.15)",
                }}
              />
            );
          })}

          {/* Top interactive card */}
          {topUser && (
            <motion.div
              key={topUser._id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDrag={(e, info) => onDrag(info)}
              onDragEnd={(e, info) => onDragEnd(info, topUser)}
              animate={controls}
              initial={{ scale: 0.985 }}
              className="absolute inset-x-0 mx-auto top-0 z-20"
              style={{ touchAction: "none" }}
            >
              <div style={{ transform: "translateY(-10px) scale(0.985)" }}>
                <UserCard
                  user={topUser}
                  mode="feed"
                  onSwipe={handleSwipe}
                  overlayType={overlay.type}
                  overlayOpacity={overlay.opacity}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* swipe hint */}
        <p className="mt-4 text-xs md:text-sm text-gray-600 font-medium">✨ One swipe can change your next project.</p>

        {/* Refresh button */}
        <button onClick={getFeed} className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M4.582 9H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Feed;
