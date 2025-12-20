import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = ({ initialMode = "login" }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(initialMode !== "signup");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SIGNUP ----------------
  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-b from-pink-100 via-purple-50 to-blue-100 px-4">

      {/* MAIN CARD — Now Tall & Premium */}
      <div className="
        w-full max-w-xl 
        bg-white/80 backdrop-blur-xl 
        rounded-3xl shadow-2xl overflow-hidden 
        animate-cardPop
        border border-white/40
      ">

        {/* GRADIENT HEADER (100% DevTinder height) */}
        <div className="
          bg-linear-to-r from-pink-600 via-red-500 to-orange-400 
          p-8 pb-8
          text-center text-white 
          relative
        ">
          <div className="text-[2.4rem] font-extrabold tracking-tight drop-shadow-xl">
            {isLoginForm ? "Welcome Back!" : "Create Account"}
          </div>

          <p className="opacity-95 mt-2 text-sm">
            {isLoginForm 
              ? "Sign in to find your coding match"
              : "Join the developer community"
            }
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-6 text-sm font-medium opacity-95">
            <div><strong>10K+</strong> Developers</div>
            <div><strong>5K+</strong> Matches</div>
            <div><strong>2K+</strong> Projects</div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="p-10 pt-12">

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* SIGNUP EXTRA FIELDS */}
          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="font-semibold text-gray-700 text-sm">First Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 text-sm">Last Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>
          )}

          {/* EMAIL FIELD */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700 text-sm">Email Address</label>
            <div className="relative mt-1">
              <span className="absolute left-4 top-3 text-gray-400 text-lg">@</span>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
                placeholder="you@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div className="mb-8">
            <label className="font-semibold text-gray-700 text-sm">Password</label>
            <div className="relative mt-1">
              <span className="absolute left-4 top-3 text-gray-400 text-lg">🔒</span>
              <input
                type="password"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* PRIMARY BUTTON */}
          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            disabled={loading}
            className="
              w-full py-3 text-lg font-semibold text-white rounded-xl 
              bg-linear-to-r from-pink-500 to-orange-400
              shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all
              disabled:opacity-50
            "
          >
            {loading ? "Processing..." : isLoginForm ? "Sign In" : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-8">
            <span className="flex-1 border-t border-gray-300"></span>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <span className="flex-1 border-t border-gray-300"></span>
          </div>

          {/* GOOGLE LOGIN */}
          <button className="
            w-full py-3 border border-gray-300 rounded-xl 
            flex items-center justify-center gap-3
            hover:bg-gray-50 transition
          ">
            <img
              src='https://img.icons8.com/color/48/google-logo.png'
              className="w-5"
            />
            <span>Continue with Google</span>
          </button>

          {/* Switch Login <-> Signup */}
          <p className="text-center mt-8 text-sm">
            {isLoginForm ? (
              <>
                New to Homio?{" "}
                <span
                  onClick={() => setIsLoginForm(false)}
                  className="text-pink-600 cursor-pointer font-semibold"
                >
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsLoginForm(true)}
                  className="text-pink-600 cursor-pointer font-semibold"
                >
                  Sign in
                </span>
              </>
            )}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
