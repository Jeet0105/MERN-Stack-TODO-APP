import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from '../redux/userSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout", { withCredentials: true });
      if (res.status === 200) {
        dispatch(signOut());
        setIsOpen(false);
        navigate('/login');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, navigate]);

  return (
    <header className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">To-Do App</Link>

        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="text-white hover:text-blue-200">Home</Link>
          <Link to="/createTodo" className="text-white hover:text-blue-200">Create Task</Link>
          <Link to="/about" className="text-white hover:text-blue-200">About</Link>
        </nav>

        <div className="relative">
          {currentUser ? (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-white flex items-center focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/150"
                alt="User Avatar"
              />
              <span className="ml-2">{currentUser.name}</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-200">Sign In</Link>
          )}

          {isOpen && currentUser && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 transition ease-out duration-100"
              role="menu"
            >
              <Link
                to="/profile"
                className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <span className='pl-14'>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
