import React, { useState } from "react";
import "../components/header.css";
// import Modal from "react-bootstrap/Modal";
// import { Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { Multiselect } from "multiselect-react-dropdown";

import { useActor } from "../hooks/useActor";
import { useGenero } from "../hooks/useGenero";
import { usePelicula } from "../hooks/usePelicula";
import editarPelicula from "../services/editarPelicula";

import ModalPelicula from "../components/ModalPelicula";

export default function EditarPelicula({
  showModal,
  handleCloseModal,
  //   formPelicula,
  id,
}) {
  const { formPelicula } = usePelicula({ id });
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
      <ModalPelicula
        modalTitulo="Editar película"
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleDropdown={handleDropdown}
        errors={errors}
        values={values}
        listadoGenero={listadoGenero}
        listadoActores={listadoActores}
        formPelicula={formPelicula}
        handleSelect={handleSelect}
        labelLimpiar="Limpiar"
        labelGuardar="Guardar"
      />
     
    </div>
  );
}
