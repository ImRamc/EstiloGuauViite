import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './Context/UserContext'; // Asegúrate de importar UserContext correctamente
import Login from './Pages/Login/Login';
import Registro from './Pages/Registro/Registro';
import Compras from './Pages/Compras/Compras';
import Productos from './Pages/Productos/Productos';
import EditarProducto from './Pages/Productos/EditarProducto';
import FormularioProducto from './Pages/Productos/formularioproducto';
import Landing from './Pages/Landing/Landing';
import Tienda from './Pages/Tienda/Tienda';
import Dashboard from './Pages/Dashboard/Dashboard';
import DetalleProducto from './Pages/DetalleProducto/DetalleProducto';
import PerfilUsuario from './Pages/PerfilUsuario/PerfilUsuario';
import FormUs from './Pages/PerfilUsuario/FormUsuario';
import Cupones from './Pages/Cupones/Cupones';
import EditarCupon from './Pages/Cupones/EditarCupon';
import FormularioCupon from './Pages/Cupones/FormularioCupon';
import Ofertas from './Pages/Ofertas/Ofertas';
import EditarOfertas from './Pages/Ofertas/EditarOfertas';
import FormularioOfertas from './Pages/Ofertas/FormularioOfertas';
import Usuarios from './Pages/Usuarios/Usuarios';
import FormularioUsuario from './Pages/Usuarios/formulariousuario';
import EditarUsuario from './Pages/Usuarios/EditarUsuario';
import Suscripcion from './Pages/Suscripcion/Suscripcion';
import FormularioSub from './Pages/Suscripcion/FormularioSub';
import EditarSub from './Pages/Suscripcion/EditarSub';

const RoutesComponent = () => {
  const { userData } = useContext(UserContext);
  const { idRol } = userData;

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Tienda" element={<Tienda />} />

        {/* Rutas protegidas por rol */}
        <Route
          path="/Compras"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <Compras />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Dashboard"
          element={
            idRol && (idRol === 3 || idRol === 2) ?(
              <Dashboard />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Productos"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <Productos />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/productos/formulario"
          element={
            idRol &&(idRol === 3 || idRol === 2) ? (
              <FormularioProducto />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/productos/editar/:id"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <EditarProducto />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />

        <Route
          path="/DetalleProducto/:idProducto"
          element={
            idRol && (idRol === 3 || idRol === 2 || idRol ===1) ? (
              <DetalleProducto />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
 

        <Route
          path="/PerfilUsuario"
          element={
            idRol && (idRol === 1 || idRol === 2) ? (
              <PerfilUsuario />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/formUs"
          element={
            idRol && (idRol === 1 || idRol === 2 || idRol === 3) ? (
              <FormUs />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        
        <Route
          path="/usuarios"
          element={
            idRol && idRol === 3 ? (
              <Usuarios />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        
        <Route
          path="/usuarios/formulario"
          element={
            idRol && idRol === 3 ? (
              <FormularioUsuario />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/usuarios/editar/:id"
          element={
            idRol && idRol === 3 ? (
              <EditarUsuario />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Ofertas"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <Ofertas />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        
        <Route
          path="/Ofertas/formulario"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <FormularioOfertas />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Ofertas/editar/:id"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <EditarOfertas />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Cupones"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <Cupones />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        
        <Route
          path="/Cupones/formulario"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <FormularioCupon />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Cupones/editar/:id"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <EditarCupon />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Suscripcion"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <Suscripcion />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        
        <Route
          path="/Suscripcion/formulario"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <FormularioSub />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Suscripcion/editar/:id"
          element={
            idRol && (idRol === 3 || idRol === 2) ? (
              <EditarSub />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
