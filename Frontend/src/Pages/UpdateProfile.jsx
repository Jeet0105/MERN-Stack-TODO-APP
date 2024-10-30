import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { signInSuccess } from '../redux/userSlice';
import Footer from "../components/Footer";
import Header from "../components/Header";

function UpdateProfile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [name, setName] = useState(currentUser.name || "");
    const [email, setEmail] = useState(currentUser.email || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!name || !email) {
            setError("Name and email are required.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.put("http://localhost:3000/api/user/update", { name, email, password }, { withCredentials: true });
            if (res.status === 200) {
                dispatch(signInSuccess({ name, email }));
                setSuccess("Profile updated successfully!");
                setPassword("");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            className="w-20 h-20 mb-4"
                            src="https://img.icons8.com/color/452/microsoft-to-do-app.png"
                            alt="logo"
                        />
                        <h1 className="text-2xl font-semibold">Update Profile</h1>
                    </div>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    {success && <div className="mb-4 text-green-500">{success}</div>}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-gray-600 mb-2">Name</label>
                            <input
                                type="text"
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
                                placeholder="Enter your email"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 mb-2">New Password (optional)</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                    <div className="mt-6 text-center text-gray-600">
                        <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline">Go Back</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UpdateProfile;
