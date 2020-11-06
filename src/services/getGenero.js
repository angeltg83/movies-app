import { BASE_API } from "./settings";

const getGenero = () => {
  // hace la peticion al endpoint.
  //?username=${username}&password=${password}
  return fetch(`${BASE_API}/generos`, {
    // mode: "no-cors",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    // body: JSON.stringify({
    //   username,
    //   password,
    // }),
  })
    .then((res) => {
      // console.log("res...", res);
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

export default getGenero;
