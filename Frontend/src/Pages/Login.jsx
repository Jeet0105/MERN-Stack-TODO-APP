import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { signInSuccess } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/user/login", { email, password }, { withCredentials: true });

      if (res.status === 200 && res.data.user) {
        dispatch(signInSuccess(res.data.user));
        navigate('/');
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-20 h-20 mb-4"
            src="https://img.icons8.com/color/452/microsoft-to-do-app.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">Login to Your Account</h1>
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          Don&apos;t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
