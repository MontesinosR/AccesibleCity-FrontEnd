import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterPage = () => {
  const navigate = useNavigate();

  //Creamos estados para controlar los input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const HandleForm = async (e) => {
    e.preventDefault();
    setError("");
    //Borra estado de error

    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
      //Establece estado de error si las passwords no coinciden
    }

    try {
      //intentamos comunicarnos con la db usando servicios
      await registerUserService({ name, email, password: pass1 });
      //ir a login
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Register</h1>

      <form onSubmit={HandleForm}>
        <fieldset>
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pass1">Password: </label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPass1(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pass2">Repeat Password: </label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
          />
        </fieldset>

        <button className="login-button">Register</button>

        {/*         Cambio el <p> de error por un ToastContainer        */}

        {error ? toast(error) : null}
      </form>

      <ToastContainer
        theme="dark"
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};
