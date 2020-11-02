import React from "react";
import NuevaPelicula from "../components/NuevaPelicula";
import GridPeliculas from "../components/GridPeliculas";

const Home = () => {

  return (
    <>
      <NuevaPelicula type={true} />

      <GridPeliculas />

    </>
  );
};

export default Home;
