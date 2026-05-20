import { useEffect, useState } from "react";

function Metas() {

  const [meta, setMeta] = useState("");

  const [mensagem, setMensagem] = useState("");

const [metas, setMetas] = useState(() => {

  const metasSalvas =
    localStorage.getItem("metas");

  return metasSalvas
    ? JSON.parse(metasSalvas)
    : [
        {
          nome: "Ganhar 5kg de massa muscular",
          progresso: 70
        }
      ];
});

useEffect(() => {

  localStorage.setItem(
    "metas",
    JSON.stringify(metas)
  );

}, [metas]);

  function excluirMeta(index) {

  const confirmar = window.confirm(
    "Deseja excluir esta meta?"
  );

  if (!confirmar) return;

  const novasMetas = metas.filter(
    (_, i) => i !== index
  );

  setMetas(novasMetas);

  setMensagem("🗑️ Meta excluída!");

  setTimeout(() => {
    setMensagem("");
  }, 3000);
}

  function aumentarProgresso(index) {

  const novasMetas = [...metas];

  if (novasMetas[index].progresso < 100) {

    novasMetas[index].progresso += 10;

    if (novasMetas[index].progresso > 100) {
      novasMetas[index].progresso = 100;
    }

    setMetas(novasMetas);

    setMensagem("🚀 Progresso atualizado!");

    setTimeout(() => {
      setMensagem("");
}, 3000);
  }
}

  function adicionarMeta() {

    if (meta.trim() === "") {

      setMensagem("⚠️ Digite uma meta!");

      setTimeout(() => {
        setMensagem("");
}, 3000);

return;

    }

    setMetas([
  ...metas,
  {
    nome: meta,
    progresso: 0
  }
   ]);

    setMeta("");

    setMensagem("🎯 Meta adicionada!");

    setTimeout(() => {
      setMensagem("");
}, 3000);

  }

  return (
    <div>

      <h1>Metas</h1>

      {mensagem && (
        <div className="notificacao">
          {mensagem}
        </div>
)}

      <div className="form-meta">

        <input
          type="text"
          placeholder="Digite sua meta"
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
        />

        <button onClick={adicionarMeta}>
          Adicionar Meta
        </button>

      </div>

      <div className="metas-container">

        {metas.map((item, index) => (

          <div className="meta-card" key={index}>

            <h2>{item.nome}</h2>

<p>{item.progresso}% concluído</p>

<div className="barra-progresso">

  <div
    className="progresso"
    style={{
      width: `${item.progresso}%`
    }}
  ></div>

</div>

      <button
  className="btn-progresso"
  onClick={() => aumentarProgresso(index)}
>
  +10%
</button>

       <button
  className="btn-excluir"
  onClick={() => excluirMeta(index)}
>
  Excluir
</button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Metas;