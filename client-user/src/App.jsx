import { useEffect, useState } from "react";
import "./App.css";
import "./css/font.css";
import Home from "./pages/Home";
import { createContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movie from "./pages/Movie";
import Seat from "./pages/Seat";
import CheckOut from "./pages/CheckOut";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/movie/:movieId",
    element: <Movie />,
  },
  {
    path: "/seat/:scheduleId",
    element: <Seat />,
  },
  {
    path: "/checkout/:scheduleId",
    element: <CheckOut />,
  },
]);

// export const UserContext = createContext(null);
export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

function App() {
  const [tampId, setTampId] = useState(0);
  const [hasLogin, setHasLogin] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedSeatsId, setBookedSeatsId] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`/customer/${user.id}`)
      .then((response) => response.json())
      .then((user) => setUser(user));
  }, []);

  const price = bookedSeats.length * 35000;

  return (
    <UserContext.Provider
      value={{
        bookedSeats,
        setBookedSeats,
        bookedSeatsId,
        setBookedSeatsId,
        price,
        hasLogin,
        setHasLogin,
        tampId,
        setTampId,
        user,
        setUser,
      }}
    >
      <RouterProvider router={router} />
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;
