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
      console.log("data peli",data)
      data[0].actores = JSON.parse(data[0].actores)
      data[0].genero = JSON.parse(data[0].genero)
    //   console.log("data peli 2",data)
      return data;
    });
};

export default getPelicula;
