import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Failed to save profile");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
            Edit Profile
          </h2>

          <div className="space-y-4">
            {/* First & Last Name */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-1/2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-1/2"
              />
            </div>

            {/* Photo URL */}
            <input
              type="text"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full"
            />

            {/* Age & Gender */}
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-1/2"
              />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered w-1/2"
              />
            </div>

            {/* About */}
            <textarea
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input input-bordered w-full h-24 resize-none"
            />

            {/* Skills */}
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={skills.join(", ")}
              onChange={(e) =>
                setSkills(e.target.value.split(",").map((s) => s.trim()))
              }
              className="input input-bordered w-full"
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition"
              onClick={saveProfile}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <UserCard
            user={{
              _id: user._id, // <-- IMPORTANT FIX (prevents Connect/Ignore from showing)
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skills
            }}
          />
        </div>
      </div>

      {showToast && (
        <div className="fixed top-5 right-5">
          <div className="alert alert-success shadow-lg">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
