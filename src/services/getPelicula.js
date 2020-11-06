import { BASE_API } from "./settings";

const getPelicula = ({id}) => {
  //?username=${username}&password=${password}
  return fetch(`${BASE_API}/getPelicula`, {
    // mode: "no-cors",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then((res) => {
    //   console.log("res...obtener ", res);
      if (!res.ok) {
        throw new Error("Response is Not Ok! :( ");
      }

      return res.json();
    })
    .then((res) => {
      const { data } = res;
      return data;
    });
};

export default getPelicula;
