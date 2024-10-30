import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!name || !email || !password) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/user/signup", { name, email, password }, { withCredentials: true });
            if (res.status === 201) {
                setName("");
                setEmail("");
                setPassword("");
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response);
                setError(error.response.data.message || "An error occurred. Please try again.");
            } else if (error.request) {
                console.error("Error request:", error.request);
                setError("No response received from server. Please check your connection.");
            } else {
                console.error("Error message:", error.message);
                setError("Network error: " + error.message);
            }
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
                    <h1 className="text-2xl font-semibold">Create an Account</h1>
                </div>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-gray-600 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
