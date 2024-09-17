import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from '../../Components/Sidebar/Sidebar';

const Cupones = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Cambia el estado inicial según tus necesidades

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [cupones, setCupones] = useState([]);

  useEffect(() => {
    obtenerCupones();
  }, []);

  const obtenerCupones = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cupones');
      setCupones(response.data);
    } catch (error) {
      console.error('Error al obtener los cupones:', error);
    }
  };

  const eliminarCupon = async (idCupon) => {
    try {
      await axios.delete(`http://localhost:3001/cupones/${idCupon}`);
      setCupones(cupones.filter(cupon => cupon.idCupon !== idCupon));
    } catch (error) {
      console.error(`Error al eliminar el cupón con ID ${idCupon}:`, error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Maneja casos de fecha nula o indefinida
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };  

  return (
    <div className="">
      <div className="px-20 carrito-page flex flex-col min-h-screen shadow-lg">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 ml-${sidebarOpen ? '96' : '64'} transition-margin duration-300 ease-in-out`}>
          <Navbar />
          <div className="carrito-container mx-4 my-8 flex-1 mt-10">
            <h2 className="text-lg font-bold mb-4 ml-4 mt-20 text-left">Lista de Cupones</h2>

            <div className="text-right justify-start pb-3">
              <Link to="/cupones/formulario">
                <button className="bg-custom border hover:bg-gray-500 text-black font-medium py-2 px-4 rounded">
                  Agregar Cupón
                </button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse border border-black">
                <thead className="bg-custom text-black text-medium">
                  <tr>
                    <th className="py-3 px-4 text-center border border-white-900">Descuento</th>
                    <th className="py-3 px-4 text-center border border-white-900">CUPON</th>
                    <th className="py-3 px-4 text-center border border-white-900">Fecha Registro</th>
                    <th className="py-3 px-4 text-center border border-white-900">Vigencia</th>
                    <th className="py-3 px-4 text-center border border-white-900">Status</th>
                    <th className="py-3 px-4 text-center border border-white-900">Editar</th>
                    <th className="py-3 px-4 text-center border border-white-900">Eliminar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {cupones.map(cupon => (
                    <tr key={cupon.idCupon}>
                      <td className="py-3 px-4 border border-gray-300">{cupon.cupon}</td>
                      <td className="py-3 px-4 border border-gray-300">{cupon.descripcion}</td>
                      <td className="py-3 px-4 border border-gray-300">{formatDate(cupon.fechaRegistro)}</td>
                      <td className="py-3 px-4 border border-gray-300">{formatDate(cupon.vigencia)}</td>
                      <td className="py-3 px-4 border border-gray-300">
                        <span className={`status-label ${cupon.status === 'activo' ? 'text-green-500' : 'text-red-500'} uppercase`}>
                            {cupon.status}
                        </span>
                     </td>
                      <td className="py-3 px-4 text-center border border-gray-300">
                        <Link to={`/cupones/editar/${cupon.idCupon}`}>
                          <button className="bg-[#CDD5AE] border hover:bg-gray-700 text-black font-bold rounded-md px-4 py-2">
                            Editar
                          </button>
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-center border border-gray-300">
                        <button
                          className="bg-white-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => eliminarCupon(cupon.idCupon)}
                        >
                          <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1h3a1 1 0 110 2h-.342l-1.292 10.331A2 2 0 0113.368 19H6.633a2 2 0 01-1.999-1.669L3.342 7H3a1 1 0 110-2h3V4zm2 2v10h6V6H7zm4 7a1 1 0 011-1V9a1 1 0 112 0v3a1 1 0 01-1 1h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cupones.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                        No hay cupones disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cupones;
