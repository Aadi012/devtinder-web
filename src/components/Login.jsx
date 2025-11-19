import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 w-full max-w-md transition-transform transform hover:scale-105">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
          {isLoginForm ? "Welcome Back!" : "Create Your Account"}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          {isLoginForm
            ? "Sign in to continue to DevConnect"
            : "Fill in your details to sign up"}
        </p>

        {/* Name fields for signup */}
        {!isLoginForm && (
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-1/2 focus:ring-2 focus:ring-primary rounded-lg transition"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-1/2 focus:ring-2 focus:ring-primary rounded-lg transition"
            />
          </div>
        )}

        {/* Email & Password */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input input-bordered w-full focus:ring-2 focus:ring-primary rounded-lg transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full focus:ring-2 focus:ring-primary rounded-lg transition"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        {/* Submit button */}
        <button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          disabled={loading}
          className="w-full mt-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : isLoginForm ? "Login" : "Sign Up"}
        </button>

        {/* Switch forms */}
        <p
          className="mt-4 text-center text-gray-500 dark:text-gray-400 cursor-pointer hover:underline font-medium"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </p>

        {/* Social buttons */}
        <div className="mt-6 text-center text-gray-400">
          <p className="mb-2">Or continue with</p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-outline btn-sm rounded-full hover:bg-gray-100 transition">
              Google
            </button>
            <button className="btn btn-outline btn-sm rounded-full hover:bg-gray-100 transition">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
