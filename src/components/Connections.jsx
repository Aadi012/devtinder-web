import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <p className="text-center mt-10 text-white">Loading...</p>;

  if (connections.length === 0)
    return <h1 className="text-center mt-10 text-white text-2xl">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold text-white mb-6">Your Connections</h1>

      <div className="flex flex-col gap-6 items-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          // Prioritize user photo; if not available, select default based on gender
          const displayPhoto =
            photoUrl ||
            (gender === "male"
              ? "https://cdn-icons-png.flaticon.com/512/4712/4712101.png" // male dev
              : gender === "female"
              ? "https://cdn-icons-png.flaticon.com/512/4712/4712102.png" // female dev
              : "https://cdn-icons-png.flaticon.com/512/4712/4712100.png"); // neutral

          return (
            <div
              key={_id}
              className="flex items-center justify-between w-11/12 md:w-2/3 bg-white/80 dark:bg-gray-800/60
                shadow-lg rounded-xl p-4 gap-6 hover:shadow-2xl transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={displayPhoto}
                  alt={`${firstName} ${lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-md p-1"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-left">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {age} years, {gender}
                  </p>
                )}
                {about && <p className="text-gray-600 dark:text-gray-300 mt-1">{about}</p>}
              </div>

              {/* Action Button */}
              <div>
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-primary px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;