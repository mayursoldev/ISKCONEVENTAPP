import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login(email, password);
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;