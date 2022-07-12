import "./style.css";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { sendEntryService, editEntryService } from "../../services";
import { useNavigate } from "react-router-dom";

export const EntryForm = ({ addEntry, entry }) => {
  // Renombramos los keys del objeto entry en este destructuring para que no se llamen igual que los estados.
  const {
    city: oldCity,
    description: oldDescription,
    id,
    neighborhood: oldNeighborhood,
    status: oldStatus,
    title: oldTitle,
  } = entry || {};

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { token } = useContext(AuthContext);
  //estados para control de los inputs
  const [title, setTitle] = useState(oldTitle || ""); //Si existe un oldTitle lo usa como estado principal y si no el estado de title es una string vacía
  const [description, setDescr] = useState(oldDescription || "");
  const [city, setCity] = useState(oldCity || "");
  const [neighborhood, setNeigh] = useState(oldNeighborhood || "");
  const [status, setStatus] = useState(oldStatus || "open");
  const imageInputRef = useRef();
  const navigate = useNavigate();
  console.log("status:", status);

  const createEntry = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      // FormData es un objeto con características especiales, la única manera de pasarle los inputs es mediante el método .append
      // Se usa FormData para enviar los ficheros al BackEnd.
      const data = new FormData();
      data.append("title", title);
      data.append("city", city);
      data.append("description", description);
      data.append("neighborhood", neighborhood);
      data.append("image", imageInputRef.current.files[0]);
      data.append("status", status);
      const entry = await sendEntryService({ data, token });

      console.log(entry);
      addEntry(entry);
      // Tras crear una Entry los inputs vuelven a estar vacíos.
      setTitle("");
      setCity("");
      setNeigh("");
      setDescr("");
      setStatus("");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  const editEntry = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData();
      data.append("title", title);
      data.append("city", city);
      data.append("description", description);
      data.append("neighborhood", neighborhood);
      data.append("image", imageInputRef.current.files[0]);
      data.append("status", status);

      await editEntryService({
        id,
        entry: data, //¿Debería enviar photo al SERVICE?
        token,
      });
      navigate(`/entry/${id}`);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={entry ? editEntry : createEntry}>
      <h1>Add new Entry</h1>
      <fieldset>
        <label className="label" htmlFor="title">
          Title:{" "}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </fieldset>
      <fieldset>
        <label className="label" htmlFor="description">
          Description:{" "}
        </label>
        <input
          type="text"
          id="description"
          name="description"
          required
          onChange={(e) => setDescr(e.target.value)}
          value={description}
        />
      </fieldset>
      <fieldset>
        <label className="label" htmlFor="image">
          Image (optional):{" "}
        </label>
        <input type="file" id="image" name="image" ref={imageInputRef} />
      </fieldset>
      <fieldset>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          name="city"
          required
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </fieldset>
      <fieldset>
        <label className="label" htmlFor="neighborhood">
          Neighborhood:{" "}
        </label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          required
          onChange={(e) => setNeigh(e.target.value)}
          value={neighborhood}
        />
      </fieldset>
      <fieldset>
        <label className="label" htmlFor="status">
          Status:{" "}
        </label>
        <select
          id="status"
          name="status"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>open</option>
          <option>close</option>
        </select>
      </fieldset>
      <button>Send Entry</button>
      {sending ? <p>Sending Entry</p> : null}
      {error ? <p>{error} </p> : null}
    </form>
  );
};
