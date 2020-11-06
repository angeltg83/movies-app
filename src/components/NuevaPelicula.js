import React, { useState } from "react";
import "../components/header.css";
import FormNuevaPelicula from "../components/FormNuevaPelicula";
// import { Button } from "semantic-ui-react";
import Modal from "react-bootstrap/Modal";

import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Multiselect } from "multiselect-react-dropdown";
import { useActor } from "../hooks/useActor";
import setRegister from "../services/setRegister";

export default function SimpleModal() {
  const [show, setShow] = useState(false);
  const [formPelicula, setFormPelicula] = useState({});
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    // console.log("ENTRO AL MOSTRAR",show);
    setShow(true);
    // /    setFormPelicula({});
  };

  const { listadoActores } = useActor();
  const [genero, setGenero] = useState("");
  const [actor, setActor] = useState([]);

  const handleDropdown = (e, data) => {
    // console.log("DATA SELECT ", data);
    setGenero(data.value);
  };

  const handleSelect = (selectList, selectedItem) => {
    console.log(selectList);
    // console.log(selectedItem);
    setActor(selectList);
  };

  const generoPeliculas = [
    { key: "HO", value: "HORROR", text: "Horror" },
    { key: "AC", value: "ACCION", text: "Acción" },
    { key: "CF", value: "CIENCIA_FICCION", text: "Ciencia ficción" },
    { key: "RO", value: "ROMANCE", text: "Romance" },
  ];

  const formik = useFormik({
    initialValues:
      // formPelicula,
      {
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
      console.log("actor selecc", actor);
      form.actor = actor;
      form.genero = genero;
      setFormPelicula(form);

      console.log("formPelicula al guardar ", formPelicula);
      // invocar a service para guardar la info.
      setRegister({ form })
        .then((status) => {
          console.log("status ", status);
          handleClose()
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
