import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { EntryForm } from "../components/EntryForm/EntryForm";
import useEntries from "../hooks/useEntries";
import { EntriesList } from "../components/EntriesList";
import { ErrorMessage } from "../components/ErrorMesage";

export const HomePage = () => {
  const { entries, loading, error, addEntry, removeEntry } = useEntries();
  const { user } = useContext(AuthContext);

  if (loading) return <p>Loading entries...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      {user && user.role === "admin" ? <EntryForm addEntry={addEntry} /> : null}

      <h1>Last Entries</h1>
      <EntriesList entries={entries} removeEntry={removeEntry} />
    </section>
  );
};
