import React , { useContext }from "react";
import { UserContext } from '../../Context/UserContext';
import { Disclosure, Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import './Navbar.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {  
  const { userData, logout } = useContext(UserContext);
const { idUsuario, idRol } = userData;

const handleLogout = () => {
  logout();
};


  return (
    <nav className=" bg-teal-600 fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <Disclosure as="nav" className="bg-white shadow-lg">
        {({ open }) => (
          <>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
              <Link to="/">
                <img className="mt-4 mb-4 block h-20 w-auto" src="/images/Logo.png" alt="Logo" />
              </Link>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               {/* Mostrar solo si idRol es 1 */}
              {idRol === 1 && (
                <Link to="/Tienda">
                  <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 hover:bg-custom">
                    <ShoppingBagIcon className="h-8 w-8 text-red-500" aria-hidden="true" />
                  </button>
                </Link>
              )}

                <Menu as="div" className="ml-3 relative">
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white px-2">
                        <span className="sr-only">Open user menu</span>
                        <Bars3Icon className="h-8 w-8 text-red-500" aria-hidden="true" />
                      </Menu.Button>
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {/* Mostrar opciones dependiendo del estado de autenticación */}
                          {idUsuario ? (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                     to="/PerfilUsuario"
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    Mi perfil
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/"
                                    onClick={handleLogout}
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    Cerrar sesión
                                  </Link>
                                )}
                              </Menu.Item>
                            </>
                          ) : (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/Login"
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Iniciar sesión
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                        </div>
                      </Menu.Items>
                    </Menu>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </nav>
  );
};

export default Navbar;
