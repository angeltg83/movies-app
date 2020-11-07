import React from "react";
import { Container, Form } from "semantic-ui-react";
import { Multiselect } from "multiselect-react-dropdown";

const FormPelicula = ({
  handleSubmit,
  handleChange,
  errors,
  values,
//   handleReset,
  listadoGenero,
  listadoActores,
  handleDropdown,
  formPelicula,
  handleSelect,
}) => {
  return (
    <>
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
    </>
  );
};

export default FormPelicula;
