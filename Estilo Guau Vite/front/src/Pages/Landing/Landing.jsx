import React from 'react';
import Navbar from "../../Components/Navbar/NavbarLanding";
import Footer from "../../Components/Footer/Footer";
import { Carrusel } from "../../Components/Carrusel/Carrusel";
import Perritos from "../../img/Perritos.jpeg"
import PerritoCapucha from "../../img/PerritoCapucha.jpg"

function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="main-image-section mt-24 py-12 bg-black bg-opacity-100">
        <div className="main-image flex justify-center">
          <div className="bg-black h-imagen-2xl">
          <img className="object-cover h-full w-full"
              src= {Perritos}
              alt="">
              </img>
          </div>
        </div>
      </div>

      <Carrusel />

      <div className="text-center py-8 bg-black bg-opacity-100">
        <h2 className="text-4xl font-bold text-white tracking-widest">C O L E C C I Ó N  V E R A N O</h2>
      </div>


      <div className="flex items-center bg-black justify-between">
  <div className="text-white bg-black text-center  mx-auto max-w-screen-xl">
    <h2 className="text-7xl mb-8 font-bold pr-24 pb-8">CAMINANDO</h2>
    <h2 className="text-7xl mb-8 font-bold pr-24 pb-8">CON</h2>
    <h2 className="text-7xl mb-8 font-bold pr-24 pb-8">ESTILO</h2>
  </div>
  <div className="image-section bg-black bg-opacity-100">
    <div className="image-content flex items-center justify-end">
      <img className="h-auto" src={PerritoCapucha} alt="" />
    </div>
  </div>
</div>

      <Footer />
    </div>
  );
}

export default Landing;
