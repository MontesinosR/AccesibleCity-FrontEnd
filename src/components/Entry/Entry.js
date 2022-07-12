import "./style.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteEntryService } from "../../services";
//import { editEntryService } from "../services";

export const Entry = ({ entry, removeEntry }) => {
  //importamos el contexto del usuario
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  //const [edit, setEdit] = useState(false);
  const [votes, setVotes] = useState(entry.votes); // Continuar con función addVotes para añadir a onClick.
  const navigate = useNavigate();

  //creamos funcion deleteEntry
  const deleteEntry = async (id) => {
    try {
      //primero lo borra usando el service
      await deleteEntryService({ id, token });

      //removeEntry lo quita del estado de entries
      if (removeEntry) {
        removeEntry(id);
        //Si estamos en entrieslist significa que le hemos pasado removeEntry a la linea 6 y entra al IF
      } else {
        navigate("/");
        //Sino, significa que estamos en EntryPage y no lo puede sacar de ninguna lista asi que hacemos navigate al homepage
      }
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(entry);
  return (
    <article className="card">
      {entry.photo ? (
        <img
          className="img"
          src={`${process.env.REACT_APP_BACKEND}/uploads/${entry.photo}`}
          alt={entry.title}
        />
      ) : null}

      <div className="info">
        <h2>
          <Link to={`/entry/${entry.id}`}> {entry.title} </Link>
        </h2>
        <p>Description: {entry.description}</p>
        <p>City: {entry.city}</p>
        <Link to={`/entries/${entry.neighborhood}`}>
          <p>Neighborhood: {entry.neighborhood}</p>
        </Link>
        <p>Status: {entry.status}</p>
      </div>

      <div className="buttons">
        <button onClick={() => (entry.votes = +1)}>
          {" "}
          {/* Habrá que crearle una función addVotes, tomando como ejemplo la de deleteEntry. ¿Dónde se guarda el número de votos? ¿Cómo prevenir que un mismo usuario pueda dar más de un voto a cada Entry? */}
          Votes: {entry.votes || 0}
        </button>
        {/* Crearle una funcionalidad con onClick, parecido delete pero para los votes. */}
        {/*       Delete Entry Button        */}
        {user && user.role === "admin" ? (
          <section>
            <button onClick={() => deleteEntry(entry.id)}>Delete Entry</button>
            {error ? <p>{error} </p> : null}
          </section>
        ) : null}
        {/*       Edit Entry Button         */}
        {user && user.role === "admin" ? (
          <section>
            <Link to={`/entry/${entry.id}/edit`}>
              <button>Edit Entry</button>
            </Link>
          </section>
        ) : null}
      </div>
    </article>
  );
};
