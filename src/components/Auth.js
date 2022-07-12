import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  //recibimos el token del usuario con el context
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <p>
      Welcome, {user.name}
      <button onClick={() => logout()}>Logout</button>
    </p>
  ) : (
    <ul>
      <li>
        {" "}
        <Link to="/register">Register</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/login">Login</Link>{" "}
      </li>
    </ul>
  );
};
