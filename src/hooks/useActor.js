import { useEffect, useState } from "react";
// import Context from "../context/UserContext";
import getActor from "../services/getActor";

export const useActor = () => {
  //
  const [listadoActores, setLitadoActores] = useState([]);

  // console.log("use actor entro.1")

  useEffect(() => {
    getActor()
      .then((data) => {
        // console.log("data VVVV ", data);
        setLitadoActores(data);
        // window.sessionStorage.setItem("token", jwt);
        // setJWT(jwt);
        // setGifs(gifs);
        // localStorage.setItem("lastKeyword", keyword);
        // console.log("user eff ", gifs);
        //   actions.setSubmitting(false);
      })
      .catch((err) => {
        console.log("Error en obtener listado actores ",err)
        // window.sessionStorage.removeItem("token");
        // console.error("ERR USE USER ", err);
        // setErr(true);
      });
  }, []);

  return { listadoActores };
};
