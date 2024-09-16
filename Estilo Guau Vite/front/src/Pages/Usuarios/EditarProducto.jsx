import React, { useState, useEffect, useContext } from 'react';
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
 
  const [message, setMessage] = useState(''); // Estado para mensajes de éxito/error
  const [currentImage, setCurrentImage] = useState([]); // Estado para almacenar la URL de la imagen actual

  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  useEffect(() => {
    
    
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        setProducto(response.data);
        const fotos = response.data.foto.split(',');
        //console.log(fotos)
        setCurrentImage(fotos); // Establecer la URL de la imagen actual
      } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
      }
    };

    obtenerProducto(); 
    const today = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    setProducto((prevProducto) => ({
      ...prevProducto,
      fecha_ingreso: today
    }));
    console.log(today)
  }, [id]);
  
  const [producto, setProducto] = useState({
    sku: '',
    producto: '',
    Marca: '',
    precio: '',
    idTalla: '',
    descripcion: '',
    foto: [],
    idOferta:'',
    fecha_ingreso : ''// 'YYYY-MM-DD'
    });

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
    const file = e.target.files;
    console.log('file')
    // Verificar si se seleccionaron más de 4 archivos
    if (file.length > 4) {
      alert("Solo puedes seleccionar un máximo de 4 imágenes.");
      e.target.value = null; // Resetea el input si excede el límite
    } else {
      // Guardar los archivos seleccionados en el estado
      setProducto({ ...producto, foto: Array.from(file) });
    }
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
      
      {if(key==='fecha_ingreso'){
        formData.append(key, new Date().toISOString().split('T')[0]);
      }
      else if(key ==='foto'){
        console.log('xdxdxdx'+producto.foto)
        if(Array.isArray(producto.foto)){
           producto.foto.forEach((file) => {
          formData.append('foto', file);  // Agrega cada archivo con el nombre 'foto'
        });
        }
        else{
          formData.append('foto', producto.foto);
        }
      }
      else{
        formData.append(key, producto[key]);
      }}
    });

    try {
      console.log(formData.get('idUsuario'));
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

         {/*fecha_ingreso*/}
         <div className="mb-4">
            <label htmlFor="fecha_ingreso" className="block text-gray-700 font-bold mb-2">
              Fecha ingreso
            </label>
            <input
              type="date"
              id="fecha_ingreso"
              name="fecha_ingreso"
              value={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese el SKU del producto"
              disabled
            />
          </div>

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
            <label htmlFor="idTalla" className="block text-gray-700 font-bold mb-2">
             Oferta
            </label>
            <input
              type="text"
              id="idOferta"
              name="idOferta"
              value={producto.idOferta}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese el ID de talla del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="idTalla" className="block text-gray-700 font-bold mb-2">
             Existencias del producto
            </label>
            <input
              type="text"
              id="cantidad"
              name="cantidad"
              value={producto.cantidad}
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
          {currentImage.length > 0 ? (
    currentImage.map((image, index) => (
              <div className="mb-4">
                 <img
        key={index}
        src={`http://localhost:3001/images/${image}`} // Asegúrate de ajustar la ruta correcta
        alt={`Imagen ${index + 1}`}
        className="gallery-image"
      />
              </div>
              )))
              : (
                <p>No hay imágenes disponibles</p>
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
              multiple
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
