import React, { useState } from "react";
import "../components/header.css";
// import FormNuevaPelicula from "../components/FormNuevaPelicula";
// import { Button } from "semantic-ui-react";
import Modal from "react-bootstrap/Modal";

import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Multiselect } from "multiselect-react-dropdown";
import { useActor } from "../hooks/useActor";
import { useGenero } from "../hooks/useGenero";
import setRegister from "../services/setRegister";

export default function NuevaPelicula() {
  const [show, setShow] = useState(false);
  const [formPelicula, setFormPelicula] = useState({});
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const { listadoActores } = useActor();
  const { listadoGenero } = useGenero();
  const [genero, setGenero] = useState([]);
  const [actores, setActores] = useState([]);

  const handleDropdown = (selectList, selectedItem) => {
    // console.log("DATA SELECT ", data);
    setGenero(selectList);
  };

  const handleSelect = (selectList, selectedItem) => {
    console.log(selectList);
    // console.log(selectedItem);
    setActores(selectList);
  };
  
  const formik = useFormik({
    initialValues: {
      nombre: "",
      duracion: "",
      sinopsis: "",
      //   genero: generoPeliculas[0],
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Obligatorio"),
      duracion: Yup.number().required("Obligatorio"),
      // lastName: Yup.string().required("Required"),
    }),
    onSubmit: (form, action) => {
      console.log("form ", form);
      console.log("sub", action);

      console.log("genero peli", genero);
      console.log("actor selecc", actores);
      form.actores = actores;
      form.genero = genero;
      setFormPelicula(form);

      console.log("formPelicula al guardar ", formPelicula);
      // invocar a service para guardar la info.
      setRegister({ form })
        .then((status) => {
          console.log("status ", status);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
      <Button
        size="tiny"
        floated="right"
        type="button"
        className="ui secondary button"
        onClick={handleShow}
      >
        Nueva película
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        // size='sm'
      >
        <Modal.Header closeButton>
          <Modal.Title>Nueva película</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            style={{
              textAlign: "center",
              // display: "flex",
              alignItems: "center",
              // flexDirection: "column",
              justifyContent: "center",
              // height: "60vh",
            }}
          >
            {/* <h4>{titulo}</h4> */}
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
              {/* <Form.Select
                placeholder="Seleccione un genero"
                options={generoPeliculas}
                onChange={handleDropdown}
                defaultValue={["CIENCIA_FICCION"]}
              /> */}
              <Multiselect
                placeholder="Seleccione un genero"
                options={listadoGenero}
                displayValue="name"
                onSelect={handleDropdown}
                singleSelect={true}
              />
              <br />
              <Multiselect
                placeholder="Seleccione actor"
                options={listadoActores}
                displayValue="name"
                onSelect={handleSelect}
              />
              <br />
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

              {/* <Button
          className="ui secondary button"
          type="button"
          onClick={formik.handleReset}
        >
          Cancelar
        </Button>
        <Button className="ui primary button" type="submit">
          Guardar
        </Button> */}
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={formik.handleReset}>
            Limpiar
          </Button>

          <Button type="submit" onClick={formik.handleSubmit} variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Button
        // className="ui secondary button"
        // type="button"
        positive
        // color='blue'
        onClick={handleOpen}
        content="Nueva película"
        size='tiny'
        floated='right'
      />
       
     
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal> */}
    </div>
  );
}
