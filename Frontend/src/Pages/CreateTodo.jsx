import axios from 'axios';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header'

function CreateTodo() {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!task) {
            setError('Task description is required.');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/todo/create", { task }, { withCredentials: true });
            if (res.status === 201) {
                setTask('');
                setSuccess('Todo created successfully');
            }
        } catch (error) {
            console.error('Error creating todo:', error);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

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
                    <h1 className="text-2xl font-semibold">Add a New Todo</h1>
                </div>
                {error && <div className="mb-4 text-red-500" role="alert" aria-live="assertive">{error}</div>}
                {success && <div className="mb-4 text-green-500" role="status" aria-live="polite">{success}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="task" className="text-gray-600 mb-2">Task</label>
                        <input
                            id="task"
                            type="text"
                            placeholder="Enter your task"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-150"
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
                        {loading ? 'Adding Todo...' : 'Add Todo'}
                    </button>
                </form>
            </div>
        </div>
        <Footer />
    </>
    );
}

export default CreateTodo;
