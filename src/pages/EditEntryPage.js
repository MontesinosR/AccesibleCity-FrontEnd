import { useParams } from "react-router-dom";
import useEntry from "../hooks/useEntry";
import { ErrorMessage } from "../components/ErrorMesage";
import { EntryForm } from "../components/EntryForm";

export const EditEntryPage = () => {
  const { id } = useParams();

  const { entry, loading, error } = useEntry(id);

  if (loading) return <p>Loading entry...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <EntryForm entry={entry} />
    </section>
  );
};
