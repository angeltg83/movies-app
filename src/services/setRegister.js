import { BASE_API } from "./settings";

const setRegister = ({ form }) => {
  // hace la peticion al endpoint.
  //?username=${username}&password=${password}
  return fetch(`${BASE_API}/setRegister`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      form,
    }),
  })
    .then((res) => {
      console.log("res...", res);
      if (!res.ok) {
        throw new Error("Response is Not Ok! :( ");
      }

      return res.json();
    })
    .then((res) => {
      const { status } = res;
      return status;
    });
};

export default setRegister;
