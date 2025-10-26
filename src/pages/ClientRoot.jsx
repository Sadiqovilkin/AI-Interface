import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import "./ClientRoot.scss";
import Header from "../components/Header/Header";
const ClientRoot = () => {
  return (
    <div className="clientMain">
      <Header />
      <div className="sidebarOutlet">
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientRoot;
