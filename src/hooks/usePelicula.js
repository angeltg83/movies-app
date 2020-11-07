import { useEffect, useState } from "react";
// import Context from "../context/UserContext";
import getPelicula from "../services/getPelicula";

export const usePelicula = ({ id }) => {
  console.log("llego al hook!", id);
  //
  const [formPelicula, setFormPelicula] = useState({
    nombre: "",
    genero: [],
    actor: [],
    duracion: "",
    // id: "",
    sinopsis: "",
  });

  // console.log("use actor entro.1")

  useEffect(() => {
    getPelicula({ id })
      .then((data) => {
        // console.log("data usePelicula ", data[0]);
        setFormPelicula(data[0]);
        // handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { formPelicula };
};
