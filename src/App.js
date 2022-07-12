import "./App.css";
import { Header } from "./components/Header/Header.js";
import { Footer } from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EntryPage } from "./pages/EntryPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EditEntryPage } from "./pages/EditEntryPage";
import { NeighborhoodEntriesPage } from "./pages/NeighborhoodEntriesPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/entry/:id" element={<EntryPage />} />
          <Route path="/entry/:id/edit" element={<EditEntryPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/entries/:neighborhood"
            element={<NeighborhoodEntriesPage />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
