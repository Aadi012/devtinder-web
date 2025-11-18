const UserCard = ({
  name = "Anonymous Developer",
  role = "Full-Stack Engineer",
  img = "https://cdn-icons-png.flaticon.com/512/4712/4712100.png", // coding avatar
  user,
}) => {

    const { firstName, lastName, photoUrl,gender,age, about} = user;
   
  return (
    <div className="
      w-80 
      p-6 
      rounded-2xl 
      bg-white/80 
      dark:bg-gray-800/60
      backdrop-blur-xl 
      shadow-xl 
      border 
      border-gray-200/60 
      dark:border-gray-700/60
      transition-all 
      duration-300 
      hover:shadow-2xl 
      hover:-translate-y-1
    ">
      <div className="flex flex-col items-center text-center">

        {/* Avatar */}
        <img
          src={photoUrl}
          alt="avatar"
          className="
            w-24 h-24 
            rounded-full 
            border-4 
            border-blue-500 
            dark:border-blue-400
            shadow-md
            p-1 
            bg-white
          "
        />

        {/* Name */}
        <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          {firstName + " " + lastName}
        </h2>

        {/* Role */}
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {role}
        </p>
        {age && gender && <p>{age + "  " + gender}</p>}
        <p>{about}</p>
        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          {/* Connect / Interested */}
          <button
            className="
              px-4 py-2 
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              rounded-xl 
              shadow-md 
              transition
              dark:bg-blue-500 
              dark:hover:bg-blue-600
            "
          >
            Connect
          </button>

          {/* Ignore / Skip */}
          <button
            className="
              px-4 py-2 
              bg-gray-200 
              hover:bg-gray-300 
              text-gray-700 
              rounded-xl 
              shadow 
              transition
              dark:bg-gray-700 
              dark:hover:bg-gray-600 
              dark:text-gray-200
            "
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
