import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
                <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
                    <div className="flex flex-col items-center mb-8">
                        <img
                            className="w-24 h-24 mb-4"
                            src="https://img.icons8.com/color/452/microsoft-to-do-app.png"
                            alt="To-Do App Logo"
                        />
                        <h1 className="text-3xl font-semibold text-blue-600">About To-Do App</h1>
                        <p className="text-gray-600 mt-4 text-center">
                            Welcome to To-Do App, your ultimate productivity companion. This application helps you manage tasks efficiently, ensuring you stay on top of your schedule.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">Our Purpose</h2>
                            <p className="text-gray-700 mt-2">
                                We believe in making productivity simple and accessible. Our goal is to create an intuitive app where you can easily organize your tasks, set priorities, and track your progress effortlessly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Create, edit, and delete tasks seamlessly.</li>
                                <li>Organize tasks with categories and due dates.</li>
                                <li>Track task completion status for better time management.</li>
                                <li>Enjoy a clean, user-friendly interface.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
                            <p className="text-gray-700 mt-2">
                                Our vision is to help people from all walks of life enhance their productivity and achieve their goals. With To-Do App, we aim to provide a flexible tool that adapts to your unique style of organization.
                            </p>
                        </section>
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/" className="text-blue-500 hover:underline text-lg">Back to Home</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
