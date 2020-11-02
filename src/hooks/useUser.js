import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext";
import getAuth from "../services/getAuth";

export default function useUser() {
  const { jwt, setJWT } = useContext(Context);
  const [errlogin, setErr] = useState(false);

  //   const [gifs, setGifs] = useState([]);
  const login = useCallback(
    ({ username, password }) => {
      console.log("1111");
      setErr(false);

      getAuth({ username, password })
        .then((jwt) => {
          console.log("jwt ", jwt);
          window.sessionStorage.setItem("token", jwt);
          setJWT(jwt);
          // setGifs(gifs);
          // localStorage.setItem("lastKeyword", keyword);
          // console.log("user eff ", gifs);
          //   actions.setSubmitting(false);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("token");
          console.error("ERR USE USER ", err);
          setErr(true);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt), // si esta logueado, tiene el jwt valor.
    login, // funcion para loguear cualquier user.
    logout,
    errlogin,
  };
}
