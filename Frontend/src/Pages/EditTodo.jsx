import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";

function EditTodo() {
    const [task, setTask] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchTodo = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/api/todo/getTodo/${id}`, { withCredentials: true });
                setTask(res.data.task);
            } catch (error) {
                console.error("Error loading todo:", error);
                setError("Failed to load todo item. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!task.trim()) {
            setError("Task cannot be empty.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.put(`http://localhost:3000/api/todo/editTodo/${id}`, { task }, { withCredentials: true });
            if (res.status === 200) {
                setTask("");
                navigate('/');
            }
        } catch (error) {
            console.error("Error updating todo:", error);
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
                    <h1 className="text-2xl font-semibold mb-6">Edit Todo</h1>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-gray-600 mb-2">Todo</label>
                            <input
                                type="text"
                                placeholder="Edit your todo"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Todo'}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-blue-500 hover:underline"
                            disabled={loading}
                        >
                            Back to Todos
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditTodo;
