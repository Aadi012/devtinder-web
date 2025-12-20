import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ConnectionCard = ({ user }) => {
  const navigate = useNavigate();

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    occupation,
    about,
    skills = [],
  } = user;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/70 backdrop-blur-xl border border-white/40
                 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition
                 w-full max-w-md"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt=""
          className="w-14 h-14 rounded-full object-cover border-2 border-white"
        />

        <div>
          <h3 className="font-bold text-gray-900 text-lg">
            {firstName} {lastName} <span className="text-green-500">✔</span>
          </h3>

          {occupation && (
            <span className="inline-block mt-1 text-xs px-2 py-0.5
              rounded-full bg-indigo-50 text-indigo-600">
              {occupation}
            </span>
          )}
        </div>
      </div>

      {/* About */}
      {about && (
        <p className="text-sm text-gray-600 mt-4 line-clamp-2">
          {about}
        </p>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-1 rounded-md
                bg-indigo-100/60 text-indigo-700
                hover:bg-indigo-200 transition"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => navigate(`/user/${_id}`)}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View Profile →
        </button>

        <button
          disabled
          className="text-sm px-3 py-1 rounded-full
            bg-gray-200 text-gray-400 cursor-not-allowed"
        >
          Message (soon)
        </button>
      </div>
    </motion.div>
  );
};

export default ConnectionCard;
