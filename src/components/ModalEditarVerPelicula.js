import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "../components/header.css";
import FormNuevaPelicula from "../components/FormNuevaPelicula";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "black",
  },
}));

export default function ModalEditarVerPelicula({ value, action }) {
  // console.log("values data ", value);
  // console.log("action", action);
  let tituloVista = "Ver película";

  // const titulo="Ver película"

  if (action === "Editar") {
    console.log("aqui.... entro!!");
    tituloVista = "Editar película";
    // setTituloVista("Editar película");
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  console.log("UID", classes);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={{ top: "20%", left: "30%" }} className={classes.paper}>
      {/* titulo={tituloVista} */}
      <FormNuevaPelicula titulo={tituloVista} value={value} />
    </div>
  );

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}
