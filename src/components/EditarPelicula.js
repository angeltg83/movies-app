import React, { useState, useEffect } from "react";
import "../components/header.css";
// import { Button } from "semantic-ui-react";
import Modal from "react-bootstrap/Modal";

import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Multiselect } from "multiselect-react-dropdown";
import { useActor } from "../hooks/useActor";
import getPelicula from "../services/getPelicula";

import { usePelicula } from "../hooks/usePelicula";

export default function EditarPelicula({
  showModal,
  handleCloseModal,
  //   formPelicula,
  id,
}) {
  const { formPelicula } = usePelicula({ id });
  console.log("llego ,", formPelicula);
  //   console.log("editar !!", formPelicula);
  //   const [show, setShow] = useState(false);
  const { listadoActores } = useActor();
  const [genero, setGenero] = useState("");
  const [actor, setActor] = useState([]);
  const [nombre, setNombre] = useState("");
  //   const [formPelicula, setFormPelicula] = useState({
  //     nombre: "",
  //     duracion: "",
  //   });

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
  const InitialValues = {
    nombre: "",
    duracion: "",
    sinopsis: "",
    //   genero: generoPeliculas[0],
  };
  const {
    initialValues,
    handleSubmit,
    handleChange,
    errors,
    values,
    handleReset,
    
  } = useFormik({
    enableReinitialize: true,
    initialValues: formPelicula || InitialValues,
    // enableReinitialize,
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
      //   setFormPelicula(form);

      //   console.log("formPelicula al guardar ", formPelicula);
      // invocar a service para actualizar en registro..
      //   setRegister({ form })
      //     .then((status) => {
      //       console.log("status ", status);
      //       handleClose();
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    },
  });

  return (
    <div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        // size='sm'
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar película</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              // flexDirection: "column",
              // display: "flex",
              // height: "60vh",
            }}
          >
            {/* <h4>{titulo}</h4> */}
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Form.Input
                onChange={handleChange}
                type="text"
                placeholder="Nombre"
                name="nombre"
                error={errors.nombre}
                value={values.nombre}
                autoComplete="off"
              />
              <Form.Input
                onChange={handleChange}
                type="number"
                placeholder="Duración(minutos)"
                name="duracion"
                value={values.duracion}
                error={errors.duracion}
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
                onChange={handleChange}
                value={values.sinopsis}
                error={errors.sinopsis}
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
          <Button variant="secondary" onClick={handleReset}>
            Limpiar
          </Button>

          <Button type="submit" onClick={handleSubmit} variant="primary">
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
