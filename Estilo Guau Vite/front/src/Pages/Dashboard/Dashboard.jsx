import React , { useContext, useState }from "react";
import { UserContext } from '../../Context/UserContext';
import NavbarAdmin from '../../Components/Navbar/NavbarAdmin';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Graficas from '../../Components/Graficas/Graficas';


const Dashboard = () => {
  const { userData, logout } = useContext(UserContext);
  const { idUsuario } = userData;


  return (
    <div className="pl-72 pt-12 pr-24 carrito-page flex flex-col min-h-screen shadow-lg">
       <NavbarAdmin />
      <Sidebar />       
        <div>
          <Graficas/>
        </div>
      </div>
  );
};

export default Dashboard;
