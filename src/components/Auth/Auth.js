import "./style.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Auth = () => {
  //recibimos el token del usuario con el context
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <p className="user-welcome">
      Welcome, {user.name}
      <button className="logout-button" onClick={() => logout()}>
        Logout
      </button>
    </p>
  ) : (
    <ul className="nav-ul">
      <li>
        {" "}
        <Link className="nav-buttons" to="/register">
          Register
        </Link>{" "}
      </li>
      <li>
        {" "}
        <Link className="nav-buttons" to="/login">
          Login
        </Link>{" "}
      </li>
    </ul>
  );
};
