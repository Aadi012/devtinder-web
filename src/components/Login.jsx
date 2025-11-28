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

  // THIS LINE MAKES /signup SHOW SIGNUP FORM AUTOMATICALLY
  const [isLoginForm, setIsLoginForm] = useState(initialMode !== "signup");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/feed");

    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");

    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 w-full max-w-md transition-transform transform hover:scale-105">

        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
          {isLoginForm ? "Welcome Back!" : "Create Your Account"}
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          {isLoginForm
            ? "Sign in to continue to Homio"
            : "Fill in your details to sign up"}
        </p>

        {/* Signup name fields */}
        {!isLoginForm && (
          <div className="flex gap-4 mb-4">
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
        )}

        {/* Email & Password */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input input-bordered w-full"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mt-3">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          disabled={loading}
          className="w-full mt-6 py-3 bg-primary text-white rounded-xl shadow-md"
        >
          {loading
            ? "Processing..."
            : isLoginForm ? "Login" : "Sign Up"}
        </button>

        {/* Switch Forms */}
        <p
          className="mt-4 text-center text-gray-500 cursor-pointer hover:underline"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "New user? Create an account"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
};

export default Login;
