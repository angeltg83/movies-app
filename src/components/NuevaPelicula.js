import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "../components/header.css";
import FormNuevaPelicula from "../components/FormNuevaPelicula";
import { Button } from "semantic-ui-react";

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

export default function SimpleModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log(classes);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={{ top: "20%", left: "30%" }} className={classes.paper}>
      {/* titulo="Nueva película" */}
      <FormNuevaPelicula  titulo="Nueva película"/>
    </div>
  );

  return (
    <div >
      <Button
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
      </Modal>
    </div>
  );
}
