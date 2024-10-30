import Login from "./Pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import CreateTodo from "./Pages/CreateTodo";
import PrivateRoute from "./components/PrivateRoute";
import Todos from "./Pages/Todos";
import EditTodo from "./Pages/EditTodo";
import UpdateProfile from "./Pages/UpdateProfile";
import About from "./Pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/createTodo" element={<CreateTodo />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/edit/:id" element={<EditTodo />} />
            <Route path="/" element={<Todos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
