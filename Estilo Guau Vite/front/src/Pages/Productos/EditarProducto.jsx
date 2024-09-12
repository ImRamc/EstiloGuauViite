import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from '../../Components/Sidebar/Sidebar';

const EditarProducto = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Cambia el estado inicial según tus necesidades

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { id } = useParams(); // Extraer el ID del producto desde la URL
  const [producto, setProducto] = useState({
    sku: '',
    producto: '',
    Marca: '',
    precio: '',
    idTalla: '',
    descripcion: '',
    foto: null
  });
  const [message, setMessage] = useState(''); // Estado para mensajes de éxito/error
  const [currentImage, setCurrentImage] = useState(''); // Estado para almacenar la URL de la imagen actual

  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        setProducto(response.data);
        setCurrentImage(response.data.foto); // Establecer la URL de la imagen actual
      } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
      }
    };

    obtenerProducto(); 

  }, [id]);
  

/*   const obtenerProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/productos/${id}`);
      setProducto(response.data);
      setCurrentImage(response.data.foto); // Establecer la URL de la imagen actual
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  }; */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleFileChange = (e) => {
    setProducto({ ...producto, foto: e.target.files[0] });
  };

  const handleRemoveImage = async () => {
    try {
      await axios.delete(`http://localhost:3001/productos/${id}/foto`);
      setProducto({ ...producto, foto: '' }); // Actualizar el estado localmente después de eliminar la imagen
      setMessage('Imagen eliminada exitosamente.');
    } catch (error) {
      console.error(`Error al eliminar la imagen del producto con ID ${id}:`, error);
      setMessage('Error al eliminar la imagen del producto.');
    }
  };  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(producto).forEach(key => {
      formData.append(key, producto[key]);
    });

    try {
      await axios.put(`http://localhost:3001/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Producto actualizado exitosamente.');
      setTimeout(() => navigate('/productos'), 2000); // Navegar a la lista de productos después de 2 segundos
    } catch (error) {
      console.error(`Error al actualizar el producto con ID ${id}:`, error);
      setMessage('Error al actualizar el producto.');
    }
  };

  return (
    <div className="carrito-page flex flex-col min-h-screen">
       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
       <div className={`flex-1 ml-${sidebarOpen ? '96' : '64'} transition-margin duration-300 ease-in-out`}></div>
      <Navbar />
      <div className="carrito-container mx-4 my-8 flex-1 mt-10">
        <h2 className="pl-10 text-lg font-bold mb-4 ml-4 mt-20 text-left">Editar Producto</h2>

        {message && <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-error'}`}>{message}</div>}

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
              Nombre del producto
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
            {currentImage && (
              <div className="mb-4">
                <img src={`http://localhost:3001/images/${currentImage}`} alt="Producto" className="w-32 h-32 object-cover" />
                <button type="button" onClick={handleRemoveImage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Eliminar Imagen
                </button>
              </div>
            )}
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
              Actualizar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditarProducto;
