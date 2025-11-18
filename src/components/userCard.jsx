const UserCard = ({ user }) => {
  if (!user) return null;

  const {
    firstName,
    lastName,
    photoUrl,
    gender,
    age,
    about,
    skills = [],
    isAvailable = true,
  } = user;

  const avatar = photoUrl && photoUrl.trim() !== ""
    ? photoUrl
    : "https://cdn-icons-png.flaticon.com/512/4712/4712100.png"; // default coding avatar

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <div className="relative flex justify-center mt-6">
        <img
          src={avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-md"
        />
        {isAvailable && (
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      <div className="px-6 py-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {firstName || "Anonymous"} {lastName || "Developer"}
        </h2>

        {(age || gender) && (
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {age ? age + " yrs" : ""} {age && gender ? " • " : ""} {gender}
          </p>
        )}

        <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
          {about || "Passionate developer, loves coding."}
        </p>

        {skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full dark:bg-blue-700 dark:text-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition">
            Connect
          </button>
          <button className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
