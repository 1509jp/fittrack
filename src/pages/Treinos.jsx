import { useEffect, useState } from "react";

function Treinos({ treinos, setTreinos }) {

  const [editandoId, setEditandoId] = useState(null);


  const [exercicio, setExercicio] = useState("");
  const [carga, setCarga] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [data, setData] = useState("");
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState("");

  const treinosFiltrados = treinos.filter(
  (treino) =>
    treino.exercicio
      .toLowerCase()
      .includes(busca.toLowerCase())
);

  function adicionarTreino() {

  if (
    exercicio.trim() === "" ||
    carga.trim() === "" ||
    repeticoes.trim() === "" ||
    data.trim() === ""
  ) {

    setMensagem("⚠️ Preencha todos os campos!");

    setTimeout(() => {
      setMensagem("");
    }, 3000);

    return;
  }

  if (editandoId !== null) {

    const treinosAtualizados = treinos.map((treino) =>

      treino.id === editandoId
        ? {
            ...treino,
            exercicio,
            carga,
            repeticoes,
            data
          }
        : treino
    );

    setTreinos(treinosAtualizados);

    setEditandoId(null);

    setMensagem("✏️ Treino atualizado!");

    setTimeout(() => {
      setMensagem("");
    }, 3000);

  } else {

    const novoTreino = {
      id: Date.now(),
      exercicio,
      carga,
      repeticoes,
      data
    };

    setTreinos([...treinos, novoTreino]);

    setMensagem("✅ Treino adicionado!");

    setTimeout(() => {
      setMensagem("");
    }, 3000);

  }

  setExercicio("");
  setCarga("");
  setRepeticoes("");
  setData("");
}
  function excluirTreino(id) {

  const confirmar = window.confirm(
    "Deseja excluir este treino?"
  );

  if (!confirmar) return;

  const novaLista = treinos.filter(
    (treino) => treino.id !== id
  );

  setTreinos(novaLista);

  setMensagem("🗑️ Treino excluído!");

  setTimeout(() => {
    setMensagem("");
  }, 3000);
}

  function editarTreino(treino) {

  setExercicio(treino.exercicio);
  setCarga(treino.carga);
  setRepeticoes(treino.repeticoes);
  setData(treino.data);

  setEditandoId(treino.id);
}

function cancelarEdicao() {

  setEditandoId(null);

  setExercicio("");
  setCarga("");
  setRepeticoes("");
  setData("");

  setMensagem("❌ Edição cancelada!");

  setTimeout(() => {
    setMensagem("");
  }, 3000);
}

  return (
    <div>

      <h1>Meus Treinos</h1>

      {mensagem && (
  <div className="notificacao">
    {mensagem}
  </div>
)}

      <div className="form-treino">

        <input
          type="text"
          placeholder="Exercício"
          value={exercicio}
          onChange={(e) => setExercicio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Carga"
          value={carga}
          onChange={(e) => setCarga(e.target.value)}
        />

        <input
          type="text"
          placeholder="Repetições"
          value={repeticoes}
          onChange={(e) => setRepeticoes(e.target.value)}
        />

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <button onClick={adicionarTreino}>

          {editandoId !== null
            ? "Salvar Alterações"
            : "Adicionar Treino"}

        </button>

        {editandoId !== null && (

        <button
          className="btn-excluir"
          onClick={cancelarEdicao}
        >
          Cancelar
        </button>

)}

      </div>

       <input
         type="text"
         placeholder="Buscar exercício..."
         value={busca}
         onChange={(e) => setBusca(e.target.value)}
         className="input-busca"
        />

      <div className="treinos-container">

  {treinosFiltrados.length === 0 ? (

    <div className="empty-state">

      <h2>
        Nenhum treino encontrado 😢
      </h2>

      <p>
        Adicione um treino ou
        tente outra busca.
      </p>

    </div>

  ) : (

    treinosFiltrados.map((treino) => (

      <div
        className="treino-card"
        key={treino.id}
      >

        <h2>{treino.exercicio}</h2>

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

        <button
          className="btn-editar"
          onClick={() =>
            editarTreino(treino)
          }
        >
          Editar
        </button>

        <button
          className="btn-excluir"
          onClick={() =>
            excluirTreino(treino.id)
          }
        >
          Excluir
        </button>

      </div>

    ))

  )}

</div>

    </div>
  );
}

export default Treinos;