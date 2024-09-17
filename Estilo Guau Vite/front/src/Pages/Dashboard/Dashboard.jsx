import React , { useContext, useState }from "react";
import { UserContext } from '../../Context/UserContext';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Graficas from '../../Components/Graficas/Graficas';


const Dashboard = () => {
  const { userData, logout } = useContext(UserContext);
  const { idUsuario } = userData;


  return (
    <div className="pl-72 pr-24 carrito-page flex flex-col min-h-screen shadow-lg">
       <Navbar />
      <Sidebar />       
        <div>
          <Graficas/>
        </div>
      </div>
  );
};

export default Dashboard;
