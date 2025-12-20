import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        if (res.data?.data) dispatch(addUser(res.data.data));
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-gray-600">Loading your profile…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-20">Unable to load profile</div>;
  }

  return <EditProfile user={user} />;
};

export default Profile;
