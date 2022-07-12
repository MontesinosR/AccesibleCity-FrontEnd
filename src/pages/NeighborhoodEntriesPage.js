import { useParams } from "react-router-dom";
import useEntriesByNeighborhood from "../hooks/useEntriesByNeighborhood";
import { EntriesList } from "../components/EntriesList";

export const NeighborhoodEntriesPage = () => {
  const { neighborhood } = useParams();
  const { entries, removeEntry, error } =
    useEntriesByNeighborhood(neighborhood);
  console.log(entries);
  return (
    <section>
      <h2>{neighborhood}</h2>
      <EntriesList entries={entries} removeEntry={removeEntry} />
      {error && <p>error: {error}</p>}
    </section>
  );
};
