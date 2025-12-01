import { useState } from "react";
import { useNavigate } from "react-router-dom"; //Why am using this instead of navigate?
import cog from "../assets/cog.svg";
import "./css/login.css";

const Login = ({ setUser }) => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8081/login";
    //The below works as a simple login validation. Turned off for testing.
    // if (!login.username || !login.password) return;
    /*Need another check here that compares to a hardcoded
    Admin login or compares to the logins in the database
    before setting the user below*/
    /* fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setUser(login);
          navigate("/Dashboard");
        }
      })
      .catch((err) => console.log(err)); */

    /* setUser(login);
    navigate("/Dashboard"); */
    alert("Disabled Temporarily");
  };

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setLogin({ ...login, [id]: value });
  };

  /*
  Maybe a useEffect to check if the login credetials match an admin acc? returns boolean from server.
  */
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <button type="submit" className="btn btn-block">
        Login
      </button>
      <button
        type="button"
        className="btn btn-block"
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
