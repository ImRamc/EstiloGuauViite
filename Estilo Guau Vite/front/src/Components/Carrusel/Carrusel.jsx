import { Carousel } from "flowbite-react";
import PerritoVerde from "../../img/PerritoVerde.jpeg";
import PerritoLentes from "../../img/PerritoLentes.jpeg";
import PerritoAguacate2 from "../../img/PerritoAguacate2.jpg";





export function Carrusel() {
  return (
    <div className="h-custom sm:h-custom-md lg:h-custom-lg xl:h-custom-xl 2xl:h-custom-3xl">
      <Carousel  leftControl={<span className="hidden">.</span>} 
        rightControl={<span className="hidden">.</span>}>
        <img src= {PerritoVerde} alt="..." />
        <img src= {PerritoLentes} alt="..." />
        <img src= {PerritoAguacate2} alt="..." />
      </Carousel>
    </div>
  );
}
