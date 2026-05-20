import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h1>FitTrack</h1>

      <nav>

        <ul>

          <li>
            <NavLink to="/">
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/treinos">
              Meus Treinos
            </NavLink>
          </li>

          <li>
            <NavLink to="/progresso">
              Progresso
            </NavLink>
          </li>

          <li>
            <NavLink to="/metas">
              Metas
            </NavLink>
          </li>

          <li>
            <NavLink to="/configuracoes">
              Configurações
            </NavLink>
          </li>

        </ul>

      </nav>

    </aside>
  );
}

export default Sidebar;