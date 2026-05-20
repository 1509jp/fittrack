import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Progresso({ treinos }) {

  const totalTreinos = treinos.length;

  const maiorCarga = treinos.reduce((maior, treino) => {

    const cargaAtual = parseInt(treino.carga);

    return cargaAtual > maior
      ? cargaAtual
      : maior;

  }, 0);

  const mediaCarga = totalTreinos > 0
    ? Math.round(
        treinos.reduce(
          (total, treino) =>
            total + parseInt(treino.carga),
          0
        ) / totalTreinos
      )
    : 0;

  const dados = treinos.map((treino, index) => ({
    semana: `Treino ${index + 1}`,
    carga: parseInt(treino.carga)
  }));

  return (
    <div>

      <h1>Progresso</h1>

      <div className="cards">

        <div className="card">
          <h3>Evolução Total</h3>
          <p>{maiorCarga}kg</p>
        </div>

        <div className="card">
          <h3>Treinos Realizados</h3>
          <p>{totalTreinos}</p>
        </div>

        <div className="card">
          <h3>Carga Média</h3>
          <p>{mediaCarga}kg média</p>
        </div>

      </div>

      <section className="chart-container">

        <h2>Evolução de Carga</h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={dados}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="semana" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="carga"
              stroke="#6c63ff"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </section>

    </div>
  );
}

export default Progresso;