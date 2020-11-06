import { useEffect, useState } from "react";
// import Context from "../context/UserContext";
import getGenero from "../services/getGenero";

export const useGenero = () => {
  //
  const [listadoGenero, setListadoGenero] = useState([]);
  useEffect(() => {
    getGenero()
      .then((data) => {
        // console.log("data VVVV ", data);
        setListadoGenero(data);
        // window.sessionStorage.setItem("token", jwt);
      })
      .catch((err) => {
        console.log("Error en obtener listado actores ",err)
        // window.sessionStorage.removeItem("token");
        // console.error("ERR USE USER ", err);
        // setErr(true);
      });
  }, []);

  return { listadoGenero };
};
