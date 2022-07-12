import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { EntryForm } from "../components/EntryForm";
import useEntries from "../hooks/useEntries";
import { EntriesList } from "../components/EntriesList";
import { ErrorMessage } from "../components/ErrorMesage";

export const HomePage = () => {
  const { entries, loading, error, addEntry, removeEntry } = useEntries();
  const { user } = useContext(AuthContext);

  if (loading) return <p>Loading entries...</p>;
  if (error) return <ErrorMessage message={error} />;

  console.log(entries);

  //En el conditional rendering si hay user, comprueba si user.role es igual a admin y entonces muestra el componente
  //de crear entrada. (panel admin) Sino es admin, no muestra el panel de crear entrada. Pero sigue saludando en el header
  //Tiene que estar así porque si pongo user.role en la primera condicion y no estamos logueados, salta error al tratar de leer
  //la propiedad role de null. Y se j*de la app.

  return (
    <section>
      {user && user.role === "admin" ? <EntryForm addEntry={addEntry} /> : null}

      <h1>Last Entries</h1>
      <EntriesList entries={entries} removeEntry={removeEntry} />
    </section>
  );
};
