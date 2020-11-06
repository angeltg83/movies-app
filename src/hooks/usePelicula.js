import { useEffect, useState } from "react";
// import Context from "../context/UserContext";
import getPelicula from "../services/getPelicula";

export const usePelicula = ({ id }) => {
  console.log("llego al hook!", id);
  //
  const [formPelicula, setFormPelicula] = useState({});

  // console.log("use actor entro.1")

  useEffect(() => {
    getPelicula({ id })
      .then((data) => {
        console.log("data usePelicula ", data[0]);
        setFormPelicula(data[0]);
        // handleClose();
        // setFormPelicula(data[0]);
        // let { nombre, duracion } = data[0];

        //   console.log(nombre)
        // console.log("formPelicula 1", formPelicula);
        // formik.initialValues = formPelicula;

      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);
  console.log("formPelicula FF ",formPelicula)
  return { formPelicula };

};
