import React, { useState } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Multiselect } from "multiselect-react-dropdown";
import { useActor } from "../hooks/useActor";
import setRegister from "../services/setRegister";

// import {listadoActores} from '../hooks/useActor'

const FormNuevaPelicula = ({ titulo, value = {} }) => {
  const { listadoActores } = useActor();
  console.log("list ", listadoActores);
  console.log("tit", titulo);
  console.log("val", value);

  //   const { login, isLogged } = useUser();
  //   const [, navigate] = useLocation();
  const [genero, setGenero] = useState("");

  
  // const { listadoActores } = useActor();

  const [actor, setActor] = useState([]);
  const handleDropdown = (e, data) => {
    console.log("DATA SELECT ", data);
    setGenero(data.value);
  };
  // if(value.genero){
  //   console.log("genero ",value.genero)
  //   // setGenero(value.genero)
  // }

  const handleSelect = (selectList, selectedItem) => {
    console.log(selectList);
    console.log(selectedItem);
    setActor(selectList);
  };

  const generoPeliculas = [
    { key: "HO", value: "HORROR", text: "Horror" },
    { key: "AC", value: "ACCION", text: "Acción" },
    { key: "CF", value: "CIENCIA_FICCION", text: "Ciencia ficción" },
    { key: "RO", value: "ROMANCE", text: "Romance" },
  ];

  const formik = useFormik({
    initialValues: {
      nombre: "" || value.nombre,
      duracion: "" || value.duracion,
      sinopsis: "" || value.sinopsis,
      //   genero: generoPeliculas[0],
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Obligatorio"),
      duracion: Yup.number().required("Obligatorio"),
      // lastName: Yup.string().required("Required"),
    }),
    onSubmit: (form) => {
      console.log("form ", form);

      console.log("genero peli", genero);
      console.log("actor selecc", actor);
      form.actor = actor;
      form.genero = genero;

      // invocar a service para guardar la info.
      setRegister({ form })
        .then((status) => {
          console.log("status ", status);
          // if (status) {
          //   login({ username: form.email, password: form.password });
          //   // llamar al hook useUser para obtener el jwt(token)
          //   // console.log("isLogged ", isLogged);
          //   // if (isLogged) {
          //   //   console.log("entr..rrrrrrrrrrr");
          //   //   navigate("/");
          //   // }
          // }

          // window.sessionStorage.setItem("token", jwt);
          // setJWT(jwt);
          // setGifs(gifs);
          // localStorage.setItem("lastKeyword", keyword);
          // console.log("user eff ", gifs);
          //   actions.setSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Container
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <h4>{titulo}</h4>
      <Form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Nombre"
          name="nombre"
          error={formik.errors.nombre}
          value={formik.values.nombre}
          autoComplete="off"
        />
        {/* <Form.Input
          onChange={formik.handleChange}
          type="text"
          placeholder="Primer Apellido"
          name="lastName"
        /> */}
        <Form.Input
          onChange={formik.handleChange}
          type="number"
          placeholder="Duración(minutos)"
          name="duracion"
          value={formik.values.duracion}
          error={formik.errors.duracion}
          autoComplete="off"
        />
        <Form.Select
          placeholder="Seleccione un genero"
          options={generoPeliculas}
          onChange={handleDropdown}
          defaultValue={["CIENCIA_FICCION"]}
        />

        <Multiselect
          placeholder="Seleccione actor"
          options={listadoActores}
          displayValue="name"
          onSelect={handleSelect}
        />

        <Form.TextArea
          type="text"
          placeholder="Sinopsis"
          name="sinopsis"
          onChange={formik.handleChange}
          value={formik.values.sinopsis}
          error={formik.errors.sinopsis}
          autoComplete="off"
          row="3"
        />

        <Button
          className="ui secondary button"
          type="button"
          onClick={formik.handleReset}
        >
          Cancelar
        </Button>
        <Button className="ui primary button" type="submit">
          Guardar
        </Button>
      </Form>
    </Container>
  );
};

export default FormNuevaPelicula;
