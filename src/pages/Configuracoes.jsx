import { useEffect, useState } from "react";

function Configuracoes() {

  const [nome, setNome] = useState(() => {
    return localStorage.getItem("nome") || "";
  });

  const [objetivo, setObjetivo] = useState(() => {
    return localStorage.getItem("objetivo") || "";
  });

  const [mensagem, setMensagem] = useState("");

  function salvarConfiguracoes() {

    localStorage.setItem("nome", nome);

    localStorage.setItem(
      "objetivo",
      objetivo
    );

    setMensagem(
      "✅ Configurações salvas!"
    );

    setTimeout(() => {
      setMensagem("");
    }, 3000);
  }

  function limparDados() {

  const confirmar = window.confirm(
    "Deseja apagar todos os dados?"
  );

  if (!confirmar) return;

  localStorage.clear();

  window.location.reload();
}

  return (
    <div>

      <h1>Configurações</h1>

      {mensagem && (
        <div className="notificacao">
          {mensagem}
        </div>
      )}

      <div className="meta-card">

        <h2>Perfil</h2>

        <div className="form-meta">

          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Seu objetivo fitness"
            value={objetivo}
            onChange={(e) =>
              setObjetivo(e.target.value)
            }
          />

          <button
            onClick={salvarConfiguracoes}
          >
            Salvar
          </button>

          <button
            className="btn-excluir"
            onClick={limparDados}
          >
            Limpar Dados
          </button>

        </div>

      </div>

    </div>
  );
}

export default Configuracoes;