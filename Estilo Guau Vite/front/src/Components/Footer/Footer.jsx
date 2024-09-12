import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#CDD5AE] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-black text-sm">© 2024 Tu Empresa. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-black-300 hover:text-white ml-4">
              Acerca de nosotros
            </a>
            <a href="#" className="text-black-300 hover:text-white ml-4">
              Política de privacidad
            </a>
            <a href="#" className="text-black-300 hover:text-white ml-4">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
