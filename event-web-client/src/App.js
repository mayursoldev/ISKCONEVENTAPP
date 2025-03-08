import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import EventDetails from "./pages/EventDetails";
// import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import { useContext } from "react";
import GlobalContext from "./context/GlobalContext";

function App() {
  const { user } = useContext(GlobalContext);

  return (
    <Router>
      {/* Show Navbar only if the user is logged in */}
      {user.token && <Navbar />}

      <Routes>
        {/* Show login page only when not logged in */}
        {!user.token ? (
          <Route path="/*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
           
            {/* <Route path="/event/:id" element={<PrivateRoute element={<EventDetails />} />} />
            <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
          */}
         
         
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;