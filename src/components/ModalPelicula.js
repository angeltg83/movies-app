import React from "react";
import Modal from "react-bootstrap/Modal";

import FormPelicula from "../components/FormPelicula";
import { Button } from "semantic-ui-react";

const ModalPelicula = ({
  //metodos del modal.
  modalTitulo,
  show,
  onHide,
  backdrop,
  keyboard,
  handleReset,
  handleSubmit,
  handleChange,
  errors,
  values,
  listadoGenero,
  listadoActores,
  handleDropdown,
  formPelicula,
  handleSelect,
  labelLimpiar,
  labelGuardar,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormPelicula
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            errors={errors}
            values={values}
            listadoGenero={listadoGenero}
            listadoActores={listadoActores}
            handleDropdown={handleDropdown}
            formPelicula={formPelicula}
            handleSelect={handleSelect}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            {labelLimpiar}
          </Button>

          <Button type="submit" onClick={handleSubmit} variant="primary">
            {labelGuardar}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalPelicula;
