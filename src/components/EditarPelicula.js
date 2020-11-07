import React, { useState } from "react";
import "../components/header.css";
import Modal from "react-bootstrap/Modal";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Multiselect } from "multiselect-react-dropdown";

import { useActor } from "../hooks/useActor";
import { useGenero } from "../hooks/useGenero";
import { usePelicula } from "../hooks/usePelicula";
import editarPelicula from "../services/editarPelicula";

export default function EditarPelicula({
  showModal,
  handleCloseModal,
  //   formPelicula,
  id,
}) {
  const { formPelicula } = usePelicula({ id });
  console.log("formPelicula ,", formPelicula);
  //   console.log("formPelicula.genero ,", formPelicula.genero);
  //   console.log("formPelicula.actores ,", formPelicula.actores);
  //   console.log("editar !!", formPelicula);
  //   const [show, setShow] = useState(false);
  const { listadoActores } = useActor();
  const { listadoGenero } = useGenero();

  const [genero, setGenero] = useState(formPelicula.genero);
  const [actores, setActores] = useState(formPelicula.actores);

  const handleDropdown = (array, item) => {
    // console.log("DATA SELECT ", data);
    console.log("array  handleDropdown ", array);

    setGenero(array);
  };

  const handleSelect = (selectList, selectedItem) => {
    console.log("setActores ", selectList);
    console.log(selectedItem);
    setActores(selectList);
  };

  const InitialValues = {
    nombre: "",
    duracion: "",
    sinopsis: "",
    //   genero: generoPeliculas[0],
  };
  const {
    // initialValues,
    handleSubmit,
    handleChange,
    errors,
    values,
    handleReset,
  } = useFormik({
    enableReinitialize: true,
    initialValues: formPelicula || InitialValues,
    validationSchema: Yup.object({
      nombre: Yup.string().required("Obligatorio"),
      duracion: Yup.number().required("Obligatorio"),
      // lastName: Yup.string().required("Required"),
    }),
    onSubmit: (form, action) => {
      console.log("sub", action);
      console.log("\n\nactor", actores);
      console.log("genero", genero);
      console.log("formPelicula.actores 0", formPelicula);
      console.log("formPelicula.actores 1", form);

      form.genero = genero || form.genero;
      form.actores = actores || form.actores;

      editarPelicula({ form })
        .then((status) => {
          console.log("status ", status);
        //   handleClose();
        handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
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
              {/* <Form.Dropdown
                placeholder="Seleccione un genero"
                options={generoPeliculas}
                onChange={handleDropdown}
                value={["ACCION"]}
                // multiple={false}/
/> */}
              <Multiselect
                placeholder="Seleccione un genero"
                options={listadoGenero}
                displayValue="name"
                onSelect={handleDropdown}
                selectedValues={formPelicula.genero}
                singleSelect={true}
              />
              <br />
              <Multiselect
                placeholder="Seleccione actor"
                options={listadoActores}
                displayValue="name"
                onSelect={handleSelect}
                selectedValues={formPelicula.actores}
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
    </div>
  );
}
