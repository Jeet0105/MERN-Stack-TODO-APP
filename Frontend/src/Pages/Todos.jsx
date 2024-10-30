import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:3000/api/todo/get", { withCredentials: true });
                setTodos(res.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
                setError("Failed to load todos. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const toggleComplete = async (todoId, isCompleted) => {
        setActionLoading(todoId);
        try {
            const res = await axios.put(
                `http://localhost:3000/api/todo/toggle-complete/${todoId}`,
                { isCompleted: !isCompleted },
                { withCredentials: true }
            );
            if (res.status === 200) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === todoId ? { ...todo, completed: !isCompleted } : todo
                    )
                );
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            setError("Failed to update todo status. Please try again.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (todoId) => {
        setActionLoading(todoId);
        try {
            const res = await axios.delete(`http://localhost:3000/api/todo/deleteTodo/${todoId}`, { withCredentials: true });
            if (res.status === 200) {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
            } else {
                setError("Error deleting todo. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
            setError("Error deleting todo. Please try again.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleEdit = (todoId) => {
        navigate(`/edit/${todoId}`);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen p-6 bg-gray-100">
                <h1 className="text-2xl font-semibold text-center mb-6">My To-Do List</h1>
                {error && <p className="text-center text-red-500">{error}</p>}
                {loading ? (
                    <p className="text-center">Loading todos...</p>
                ) : (
                    <ul className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        {todos.map(todo => (
                            <li key={todo._id} className="flex items-center justify-between p-3 border-b">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo._id, todo.completed)}
                                        disabled={actionLoading === todo._id}
                                        className="mr-3"
                                    />
                                    <span className={todo.completed ? "line-through text-gray-400" : ""}>
                                        {todo.task}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(todo._id)}
                                        className="text-blue-500 hover:underline"
                                        disabled={actionLoading === todo._id}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo._id)}
                                        className="text-red-500 hover:underline"
                                        disabled={actionLoading === todo._id}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Home;
