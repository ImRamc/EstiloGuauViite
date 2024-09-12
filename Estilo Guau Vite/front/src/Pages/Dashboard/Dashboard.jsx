import React , { useContext, useState }from "react";
import { UserContext } from '../../Context/UserContext';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Graficas from '../Graficas/Graficas';

const Dashboard = () => {
  const { userData, logout } = useContext(UserContext);
  const { idUsuario } = userData;
  const [sidebarOpen, setSidebarOpen] = useState(true); // Cambia el estado inicial según tus necesidades

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex px-20">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ml-${sidebarOpen ? '96' : '64'} transition-margin duration-300 ease-in-out`}>
        <Navbar />
        <div>
          <Graficas/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
