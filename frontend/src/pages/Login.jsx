import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";
import cog from "../assets/SVG/cog.svg";
import "./css/login.css";

const Login = ({ setUser }) => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const url = import.meta.env.VITE_LOGIN_URL;
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login.username && !login.password) {
      alert("Please fill out Username and Password.");
      return;
    } else if (!login.username) {
      alert("Please fill out Username.");
      return;
    } else if (!login.password) {
      alert("Please fill out Password.");
      return;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setUser(login.username);
          localStorage.setItem("token", data.token);
          navigate("/Dashboard");
        } else {
          localStorage.removeItem("token");
          alert("Incorrect Login Information!");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //alert("Disabled Temporarily. Use Bypass.");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setLogin({ ...login, [id]: value });
  };

  if (user?.username) {
    return <Navigate to="/Dashboard" />;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>LOGIN</h2>

      <div className="login-image">
        <img src={cog} alt="cog" className="logo" />
      </div>

      <label htmlFor="username" className="form-label">
        Username:
        <input
          type="text"
          className="form-input"
          id="username"
          value={login.username}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="password" className="form-label">
        Password:
        <input
          type="password"
          className="form-input"
          id="password"
          value={login.password}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="btn">
        Login
      </button>

      <button
        type="button"
        className="btn"
        onClick={() => {
          setUser({ username: "Guest" });
          navigate("/Dashboard");
        }}
      >
        Bypass
      </button>
    </form>
  );
};
export default Login;
