import axios from "axios";
import { useState } from "react";

const Login = () => {
 const [emailId, setEmailId] = useState("aditya@gmail.com");
 const [password, setPassword] = useState("Aditya@123");

const handleLogin = async (e) =>{
     try{
        e.preventDefault();
        const res = await axios.post("http://localhost:8888/login",{
          emailId,
          password
        },{withCredentials :true});
     }catch(err){
      console.error(err);
     }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl rounded-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-2 text-primary">
            Developer Login
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login with your Gmail to collaborate on DevTinder projects
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              value = {emailId}
              placeholder="Email (must be @gmail.com)"
              className="input input-bordered w-full"
              required
              onChange={(e) => setEmailId(e.target.value)}
            />
            <input
              type="password"
              value = {password}
              placeholder="Password"
              className="input input-bordered w-full"
              required
              onChange={(e) =>setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary w-full mt-20" onClick={handleLogin}>
              Login
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-4">
            © {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
