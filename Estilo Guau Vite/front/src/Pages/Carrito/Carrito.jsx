import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Carrito = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simulación de carga de productos
    const fetchProductos = async () => {
      try {
        // Simulamos la carga de productos
        const productos = [
          { id: 1, nombre: 'Producto 1', precio: 10, cantidad: 1, imagen: '../images/Logo.png' },
          { id: 2, nombre: 'Producto 2', precio: 20, cantidad: 2, imagen: '../images/Logo.png' }
        ];
        setProductos(productos);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
    // Lógica adicional para eliminar de la base de datos o cualquier otra acción
  };

  // Función para calcular el precio total por producto
  const calcularTotalProducto = (precio, cantidad) => {
    return precio * cantidad;
  };

  // Función para calcular el precio total de todos los productos en el carrito
  const calcularTotalCompra = () => {
    let total = 0;
    productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  };

  // Función para manejar cambios en la cantidad de productos
  const handleChangeCantidad = (id, event) => {
    const cantidad = parseInt(event.target.value, 10);
    const nuevosProductos = productos.map((producto) =>
      producto.id === id ? { ...producto, cantidad: cantidad } : producto
    );
    setProductos(nuevosProductos);
    // Lógica adicional para actualizar la cantidad en la base de datos o cualquier otra acción
  };

  // Función para procesar el pago (simulación)
  const procesarPago = () => {
    alert("Procesando pago..."); // Aquí deberías implementar la lógica real para el pago
  };

  return (
    <div className="carrito-page flex flex-col min-h-screen">
      <Navbar />
      <div className="carrito-container mx-4 my-8 flex-1 mt-10">
        {/* Ajuste para evitar que el Navbar tape el contenido */}
        <h2 className="text-lg font-bold mb-4 ml-4 mt-20 text-left">Items ({productos.length})</h2>
        <table className="tabla-carrito w-full border-collapse">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="border py-2 px-4">Items</th>
              <th className="border py-2 px-4">Precio</th>
              <th className="border py-2 px-4">Cantidad</th>
              <th className="border py-2 px-4">Total</th>
              <th className="border py-2 px-4">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border">
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-12 h-auto"
                    />
                  </div>
                </td>
                <td className="border py-2 px-4">${producto.precio.toFixed(2)}</td>
                <td className="border py-2 px-4">
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => handleChangeCantidad(producto.id, e)}
                    min="1"
                    className="w-12 text-center"
                  />
                </td>
                <td className="border py-2 px-4">${calcularTotalProducto(producto.precio, producto.cantidad).toFixed(2)}</td>
                <td className="border py-2 px-4">
                  <button onClick={() => eliminarProducto(producto.id)} className="cursor-pointer">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-container mt-4 flex justify-end items-center">
          <p className="font-bold mr-2">Total:</p>
          <p className="text-lg mr-4">${calcularTotalCompra().toFixed(2)}</p>
          <button className="px-4 py-2 bg-green-700 text-white rounded cursor-pointer text-lg" onClick={procesarPago}>Pagar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Carrito;
