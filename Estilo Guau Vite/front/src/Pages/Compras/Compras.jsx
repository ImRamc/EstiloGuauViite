import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Footer from "../../Components/Footer/Footer";

const Compras = () => {
    const [compras, setCompras] = useState([]);
    useEffect(() => {
        // Función para obtener las compras desde el servidor
        const fetchCompras = async () => {
            try {
                const response = await fetch('http://localhost:3001/compras');
                if (!response.ok) {
                    throw new Error('No se pudieron obtener las compras');
                }
                const data = await response.json();
                setCompras(data);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
                // Manejo de errores (puedes mostrar un mensaje al usuario, etc.)
            }
        };

        // Llama a la función para obtener las compras
        fetchCompras();
    }, []); // Se ejecuta solo una vez al montar el componente

    const [clientesRecientes, setClientesRecientes] = useState([]);
    useEffect(() => {
        const fetchClientesRecientes = async () => {
            try {
                const response = await fetch('http://localhost:3001/clientes-recientes');
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los clientes recientes');
                }
                const data = await response.json();
                setClientesRecientes(data);
            } catch (error) {
                console.error('Error al obtener los clientes recientes:', error);
                // Manejo de errores (puedes mostrar un mensaje al usuario, etc.)
            }
        };

        fetchClientesRecientes();
    }, []);

    return (
        <div className="p-10 pl-72 pr-28 min-h-screen flex flex-col md:max-xl:flex">
              <Navbar />
            <Sidebar/>
            
            <div className="flex flex-row justify-center py-20 ">
            
                <div className="overflow-x-auto ">
                    <table className="w-full border-collapse border border-gray-400 ">
                        <thead>
                            <tr className="bg-custom border-collapse border border-gray-400">
                                <th className="p-2 px-20 border-collapse border border-gray-400">Folio de compra</th>
                                <th className="p-2 px-20 border-collapse border border-gray-400">Descripción</th>
                                <th className="p-2 px-20 border-collapse border border-gray-400">Precio</th>
                                <th className="p-2 px-20 border-collapse border border-gray-400">Cantidad</th>
                                <th className="p-2 px-20 border-collapse border border-gray-400">Cliente</th>
                            </tr>
                        </thead>
                        <tbody className="border-collapse border border-gray-400">
                            {compras.map((compra) => (
                                <tr key={compra.idCompra}>
                                    <td className="p-2 px-20 border-collapse border border-gray-400">{compra.idCompra}</td>

                                    <td className="flex flex-row p-2 px-20 border-collapse border border-gray-300">
                                    <img src={`http://localhost:3001/images/${compra.foto}`} 
                                    alt="" className=" h-28 rounded-full p-3" />
                                    <div className="flex flex-col" >
                                    <span>{compra.descripcion_producto}</span>
                                    <span className="font-light">Talla: {compra.talla}</span></div>
                                    </td>
                                    <td className="p-2 px-20 border-collapse border border-gray-400">{compra.precio}</td>
                                    <td className="p-2 px-20 border-collapse border border-gray-400">{compra.cantidad_producto}</td>
                                    <td className="p-2 px-20 border-collapse border border-gray-400">{compra.cliente}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h1 className="mt-20 py-5 text-start font-roboto font-semibold text-4xl bg-custom pl-2 border-collapse border border-gray-400">  
                        Clientes recientes</h1>
                    <table className="w-full">
                        <tbody>
                            {clientesRecientes.map((cliente, index) => (
                                <tr key={index}>
                                   
                                    <td className="flex flex-row text-start p-2 font-roboto border-collapse border border-gray-400">
                                    <img src={`http://localhost:3001/images/${cliente.foto}`} 
                                    className=" h-28 rounded-full p-3"></img>
                                        <div className="flex flex-col">
                                        <span className="font-medium">{cliente.nombre}</span>
                                        <span className="ml-4 text-xs">{cliente.correo}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 text-start px-1"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Compras;