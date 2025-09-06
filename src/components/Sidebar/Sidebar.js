import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          <li className="active">BUSCAR REQUISIÇÃO</li>
          <li>GERÊNCIA</li>
          <li>SEPARAR MATERIAIS</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
