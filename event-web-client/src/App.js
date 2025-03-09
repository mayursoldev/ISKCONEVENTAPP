import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import GlobalContext from "./context/GlobalContext";
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Login/Login";

function App() {
  const { user } = useContext(GlobalContext);

  return (
    <Router>
   
      {user.token && <Navbar />}

      <Routes>
       
        {!user.token ? (
          <Route path="/*" element={<Login/>} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
                    
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;