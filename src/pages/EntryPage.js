import { useParams } from "react-router-dom";
import useEntry from "../hooks/useEntry";
import { ErrorMessage } from "../components/ErrorMesage";
import { Entry } from "../components/Entry/Entry";

export const EntryPage = () => {
  const { id } = useParams();
  //  console.log(params)

  const { entry, loading, error } = useEntry(id);

  if (loading) return <p>Loading entry...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <Entry entry={entry} />
    </section>
  );
};
