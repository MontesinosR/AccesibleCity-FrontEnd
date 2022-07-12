import { useEffect, useState } from "react";
import { getAllEntriesWithVotesService } from "../services";

const useEntries = () => {
  //estado
  const [entries, setEntries] = useState([]);
  const [loading, setLoding] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoding(true);

        const data = await getAllEntriesWithVotesService();

        setEntries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoding(false);
      }
    };

    loadEntries();
  }, []);

  //función para añadir entradas automáticamente
  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  //función para que se desparezcan las entradas borradas
  const removeEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  //función para editar entradas

  return { entries, loading, error, addEntry, removeEntry };
};

export default useEntries;
