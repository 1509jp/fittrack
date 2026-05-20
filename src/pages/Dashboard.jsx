import Card from "../components/Card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useNavigate } from "react-router-dom";

function Dashboard({ treinos }) {

  const navigate = useNavigate();

  const nomeUsuario =
  localStorage.getItem("nome");

  const objetivoUsuario =
  localStorage.getItem("objetivo");

  const dataAtual =
  new Date().toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

  const totalTreinos = treinos.length;

  const totalExercicios =
  new Set(
    treinos.map(
      (treino) => treino.exercicio
    )
  ).size;

  const maiorCarga = treinos.reduce((maior, treino) => {

    const cargaAtual = parseInt(treino.carga);

    return cargaAtual > maior
      ? cargaAtual
      : maior;

  }, 0);

  const mediaCarga =
  totalTreinos > 0
    ? Math.round(
        treinos.reduce(
          (total, treino) =>
            total + parseInt(treino.carga),
          0
        ) / totalTreinos
      )
    : 0;

    const treinoMaisPesado =
  treinos.find(
    (treino) =>
      parseInt(treino.carga) === maiorCarga
  );

  const data = treinos.map((treino, index) => ({
  semana: `Treino ${index + 1}`,
  carga: parseInt(treino.carga)
}));

  const ultimosTreinos =
    [...treinos]
      .reverse()
      .slice(0, 3);

      let conquista = "";

if (totalTreinos >= 10) {

  conquista =
    "🏆 Você alcançou 10 treinos!";

} else if (totalTreinos >= 5) {

  conquista =
    "🔥 Você já completou 5 treinos!";

} else if (totalTreinos >= 1) {

  conquista =
    "💪 Primeiro treino registrado!";
}

const hoje = new Date()
  .toISOString()
  .split("T")[0];

const treinosHoje = treinos.filter(
  (treino) => treino.data === hoje
).length;

const cargaTotal = treinos.reduce(
  (total, treino) =>
    total + parseInt(treino.carga),
  0
);

const frequenciaExercicios = {};

treinos.forEach((treino) => {

  const nome = treino.exercicio;

  frequenciaExercicios[nome] =
    (frequenciaExercicios[nome] || 0) + 1;

});

let exercicioFavorito = "";

let maiorFrequencia = 0;

for (const exercicio in frequenciaExercicios) {

  if (
    frequenciaExercicios[exercicio] >
    maiorFrequencia
  ) {

    maiorFrequencia =
      frequenciaExercicios[exercicio];

    exercicioFavorito = exercicio;
  }
}

const hojeData = new Date();

const inicioSemana = new Date();

inicioSemana.setDate(
  hojeData.getDate() - hojeData.getDay()
);

const treinosSemana = treinos.filter(
  (treino) => {

    const dataTreino = new Date(
      treino.data
    );

    return dataTreino >= inicioSemana;

  }
).length;

  return (
    <>

      <header className="topbar">

        <div>

          <h2>
            Olá,
            {" "}
            {nomeUsuario || "Atleta"} 👋
          </h2>

          <p>
            Hoje é {dataAtual}
          </p>

          {objetivoUsuario && (

          <p>

             Objetivo:
            {" "}
            <strong>
            {objetivoUsuario}
            </strong>

          </p>

          )}

        </div>

        <button onClick={() => navigate("/treinos")}>
          + Registrar Treino
        </button>

      </header>

      <section className="cards">

        <Card
  titulo="Treinos do mês"
  valor={totalTreinos}
  icone="📅"
/>

<Card
  titulo="Maior carga"
  valor={`${maiorCarga}kg`}
  icone="🏋️"
/>

<Card
  titulo="Exercícios cadastrados"
  valor={totalExercicios}
  icone="💪"
/>

<Card
  titulo="Carga Média"
  valor={`${mediaCarga}kg`}
  icone="📊"
/>

<Card
  titulo="Treinos Hoje"
  valor={treinosHoje}
  icone="🔥"
/>

<Card
  titulo="Carga Total"
  valor={`${cargaTotal}kg`}
/>

      </section>

      <section className="meta-card">

  <h2>Resumo</h2>

  <p>
    Exercício mais pesado:
    {" "}
    <strong>
      {treinoMaisPesado
        ? treinoMaisPesado.exercicio
        : "Nenhum"}
    </strong>
  </p>

  <p>
    Continue treinando para
    evoluir cada vez mais 🚀
  </p>

  <p>

  Exercício favorito:
  {" "}

  <strong>
    {exercicioFavorito || "Nenhum"}
  </strong>

</p>

      </section>

      {conquista && (

  <section className="meta-card">

    <h2>Conquista</h2>

    <p>{conquista}</p>

  </section>

)}

<section className="meta-card">

  <h2>Resumo Semanal</h2>

  <p>
    Você treinou
    {" "}
    <strong>
      {treinosSemana}
    </strong>
    {" "}
    vez(es) esta semana 🔥
  </p>

</section>

      <section className="chart-container">

  <h2>Últimos Treinos</h2>

  {ultimosTreinos.length === 0 ? (

    <p>
      Nenhum treino cadastrado.
    </p>

  ) : (

    ultimosTreinos.map((treino) => (

      <div
        key={treino.id}
        className="treino-card"
      >

        <h3>{treino.exercicio}</h3>

        <p>
          Carga: {treino.carga}
        </p>

        <p>
          Repetições:
          {" "}
          {treino.repeticoes}
        </p>

        <p>
          Data: {treino.data}
        </p>

      </div>

    ))

  )}

      </section>

      <section className="chart-container">

        <h2>Gráfico de Evolução</h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="semana" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="carga"
              stroke="#6c63ff"
              strokeWidth={4}
              dot={{ r: 6 }}
              activeDot={{ r: 9 }}
              animationDuration={1200}
            />

          </LineChart>

        </ResponsiveContainer>

      </section>

    </>
  );
}

export default Dashboard;