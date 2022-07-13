import "./style.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteEntryService, voteEntryService } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Entry = ({ entry, removeEntry }) => {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [votes, setVotes] = useState(entry.votes || 0);
  const navigate = useNavigate();

  const addVote = async () => {
    let userId = user?.id;
    let entryId = entry.id;

    try {
      await voteEntryService({ userId, entryId, token });
      setVotes(votes + 1);
    } catch (error) {
      toast(error.message);
      setError("");
    }
  };

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
          <p className="neighborhood">Neighborhood: {entry.neighborhood}</p>
        </Link>
        <p>Status: {entry.status}</p>
      </div>
      <div className="buttons">
        {/*       Votes Button               */}
        <button
          onClick={() => {
            if (user) {
              addVote();
            } else {
              navigate("/login");
            }
          }}
        >
          {" "}
          Votes: {votes}
        </button>

        {/*       Delete Entry Button        */}
        {user && user.role === "admin" ? (
          <section>
            <button onClick={() => deleteEntry(entry.id)}>Delete Entry</button>
            {error ? <p>{error} </p> : null}
          </section>
        ) : null}

        {/*        Edit Entry Button         */}
        {user && user.role === "admin" ? (
          <section>
            <Link to={`/entry/${entry.id}/edit`}>
              <button>Edit Entry</button>
            </Link>
          </section>
        ) : null}
      </div>
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
    </article>
  );
};
