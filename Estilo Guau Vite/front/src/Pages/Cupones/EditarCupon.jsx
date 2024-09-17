import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from '../../Components/Sidebar/Sidebar';

const EditarCupon = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [cupon, setCupon] = useState({
      cupon: '',
      descripcion: '',
      fechaRegistro: '',
      vigencia: '',
      status: 0 // Inicializa status como un número
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    useEffect(() => {
      const obtenerCupon = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/cupones/${id}`);
          setCupon({
            ...response.data,
            status: response.data.status === 1 ? 1 : 0 // Asegúrate de que status sea un número
          });
        } catch (error) {
          console.error(`Error al obtener el cupón con ID ${id}:`, error);
        }
      };
  
      obtenerCupon();
    }, [id]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCupon(prevState => ({
        ...prevState,
        [name]: name === 'status' ? (value === 'activo' ? 1 : 0) : value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`http://localhost:3001/cupones/${id}`, cupon);
        if (response.status === 200) {
          setMessage('Cupón actualizado exitosamente.');
          setTimeout(() => navigate('/cupones'), 2000);
        }
      } catch (error) {
        console.error(`Error al actualizar el cupón con ID ${id}:`, error);
        setMessage('Error al actualizar el cupón.');
      }
    };
  

  return (
    <div className="pl-72 pr-24 carrito-page flex flex-col min-h-screen shadow-lg">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ml-${sidebarOpen ? '96' : '64'} transition-margin duration-300 ease-in-out`}>
        <Navbar />
        <div className="carrito-container mx-4 my-8 flex-1 mt-10">
          <div className="text-right items-center mb-4 mt-20">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Volver
            </button>
            <h2 className="pl-10 text-lg font-bold mb-4 ml-4 mt-4 text-left">Editar Cupón</h2>
          </div>

          {message && <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-error'}`}>{message}</div>}

          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="cupon" className="block text-gray-700 font-bold mb-2">
                Valor del Cupón
              </label>
              <input
                type="text"
                id="cupon"
                name="cupon"
                value={cupon.cupon}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingrese el código del cupón"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={cupon.descripcion}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingrese la descripción del cupón"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fechaRegistro" className="block text-gray-700 font-bold mb-2">
                Fecha de Registro
              </label>
               <input
                type="date" // Tipo date para manejar fechas
                id="fechaRegistro"
                name="fechaRegistro"
                value={cupon.fechaRegistro ? new Date(cupon.fechaRegistro).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingrese la fecha de registro"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="vigencia" className="block text-gray-700 font-bold mb-2">
                Vigencia
              </label>
              <input
                type="date" // Tipo date para manejar fechas
                id="vigencia"
                name="vigencia"
                value={cupon.vigencia ? new Date(cupon.vigencia).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingrese la fecha de vigencia"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={cupon.status === 1 ? 'activo' : 'inactivo'}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditarCupon;
