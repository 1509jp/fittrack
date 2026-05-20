import "./App.css";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Treinos from "./pages/Treinos";
import Progresso from "./pages/Progresso";
import Metas from "./pages/Metas";
import Configuracoes from "./pages/Configuracoes";

import { Routes, Route } from "react-router-dom";

function App() {

  const [darkMode, setDarkMode] = useState(() => {

  const temaSalvo =
    localStorage.getItem("darkMode");

  return temaSalvo === "true";

});

  const [loading, setLoading] = useState(true);

  const [treinos, setTreinos] = useState(() => {

    const treinosSalvos =
      localStorage.getItem("treinos");

    return treinosSalvos
      ? JSON.parse(treinosSalvos)
      : [
          {
            id: 1,
            exercicio: "Supino",
            carga: "40kg",
            repeticoes: "10 reps",
            data: "2026-05-07"
          }
        ];
  });

  useEffect(() => {

    localStorage.setItem(
      "treinos",
      JSON.stringify(treinos)
    );

  }, [treinos]);

  useEffect(() => {

  localStorage.setItem(
    "darkMode",
    darkMode
  );

}, [darkMode]);

  useEffect(() => {

    setTimeout(() => {

      setLoading(false);

    }, 2000);

  }, []);

  if (loading) {

    return (

      <div className="loading-screen">

        <h1>FitTrack</h1>

        <p>Carregando sistema...</p>

      </div>

    );
  }

  return (

    <div className={darkMode ? "container dark" : "container"}>

      <Sidebar />

      <button
        className="toggle-theme"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={<Dashboard treinos={treinos} />}
          />

          <Route
            path="/treinos"
            element={
              <Treinos
                treinos={treinos}
                setTreinos={setTreinos}
              />
            }
          />

          <Route
            path="/progresso"
            element={<Progresso treinos={treinos} />}
          />

          <Route
            path="/metas"
            element={<Metas />}
          />

          <Route
            path="/configuracoes"
            element={<Configuracoes />}
          />

        </Routes>

        <footer className="footer">

          <p>
            FitTrack © 2026
          </p>

          <span>
            Sistema de acompanhamento fitness
          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;