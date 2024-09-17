import React , { useContext }from "react";
import { UserContext } from '../../Context/UserContext';
import { Disclosure, Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import {ShoppingCartIcon , ShoppingBagIcon } from '@heroicons/react/24/solid';
import { Bars3Icon , MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import './Navbar.css';

const navigation = [
  // { name: 'Dashboard', href: '#', current: true },
  // { name: 'Team', href: '#', current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const NavbarLanding = () => {
  const { userData, logout } = useContext(UserContext);
  const { idUsuario } = userData;

  const handleLogout = () => {
    logout();
  };

  return (
    <section>
      <nav className="bg-teal-600 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <Disclosure as="nav" className="bg-white shadow-lg fixed w-full z-10">
          {({ open }) => (
            <>
              <div className="bg-[#000000] py-4 bg-transparent">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                  {/* Logo */}
                  <Link to="/">
                  <img className=" block h-20 w-auto" src="../images/Logo.png" alt="" />
                  </Link> 
                  {/* search button */}
                  <Link to="/Tienda">
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white px-2">
                      <span className="sr-only">Open user menu</span>
                      <MagnifyingGlassIcon className="h-9 w-9 text-red-500" aria-hidden="true"  strokeWidth={3}  />
                    </button>
                    </Link>



                  {/* Encabezado */}
                  <div className="text-center flex-grow">
                    <div className="text-white text-5xl font-thin tracking-widest font-roboto">
                      ESTILO GUAU
                    </div>
                  </div>

                  {/* Right-hand side items */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Cart button */}
                    <Link to="/Tienda">
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white px-2">
                      <span className="sr-only">Open user menu</span>
                      <ShoppingCartIcon className="h-9 w-9 text-red-500" aria-hidden="true" />
                    </button>
                    </Link>
                    {/* Shop button */}
                    <Link to="/Tienda">
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <ShoppingBagIcon className="h-9 w-9 text-red-500" aria-hidden="true" />
                    </button>
                    </Link>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <Bars3Icon className="h-9 w-9 text-red-500"  aria-hidden="true"  strokeWidth={3} />
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
              </div>

              {/* Mobile menu */}
              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </section>
  );
};

export default NavbarLanding;
