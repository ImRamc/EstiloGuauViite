import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from '../../Components/Sidebar/Sidebar';

const FormularioProducto = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true); // Cambia el estado inicial según tus necesidades

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [producto, setProducto] = useState({
    sku: '',
    producto: '',
    Marca: '',
    precio: '',
    idTalla: '',
    descripcion: '',
    foto: null
  });

  const [agregado, setAgregado] = useState(false);
  const [rutaProducto, setRutaProducto] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleFileChange = (e) => {
    setProducto({ ...producto, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('sku', producto.sku);
      formData.append('producto', producto.producto);
      formData.append('Marca', producto.Marca);
      formData.append('precio', producto.precio);
      formData.append('idTalla', producto.idTalla);
      formData.append('descripcion', producto.descripcion);
      
      if (producto.foto) {
        formData.append('foto', producto.foto);
      }

      const response = await axios.post('http://localhost:3001/producto-nuevo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setAgregado(true);
        // Redirigir a la página de productos después de 2 segundos
        setTimeout(() => {
          setAgregado(false); // Limpiar el mensaje de éxito después de la redirección
          navigate('/productos');
        }, 2000);
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <div className="carrito-page flex flex-col min-h-screen">
       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
       <div className={`flex-1 ml-${sidebarOpen ? '96' : '64'} transition-margin duration-300 ease-in-out`}>
      <Navbar />
      <div className="carrito-container mx-4 my-8 flex-1 mt-10">
        <h2 className="pl-10 text-lg font-bold mb-4 ml-4 mt-20 text-left">Agregar Nuevo Producto</h2>

        {agregado && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">¡Producto agregado correctamente!</strong>
            <p className="block sm:inline">Puedes ver el producto <a href={rutaProducto} className="text-blue-500 hover:underline">aquí</a>.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="sku" className="block text-gray-700 font-bold mb-2">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={producto.sku}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese el SKU del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="producto" className="block text-gray-700 font-bold mb-2">
              Nombre Producto
            </label>
            <input
              type="text"
              id="producto"
              name="producto"
              value={producto.producto}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese el nombre del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Marca" className="block text-gray-700 font-bold mb-2">
              Marca
            </label>
            <input
              type="text"
              id="Marca"
              name="Marca"
              value={producto.Marca}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese la marca del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="precio" className="block text-gray-700 font-bold mb-2">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese el precio del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="idTalla" className="block text-gray-700 font-bold mb-2">
              ID Talla
            </label>
            <input
              type="text"
              id="idTalla"
              name="idTalla"
              value={producto.idTalla}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese el ID de talla del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese la descripción del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="foto" className="block text-gray-700 font-bold mb-2">
              Foto
            </label>
            <input
              type="file"
              id="foto"
              name="foto"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default FormularioProducto;
