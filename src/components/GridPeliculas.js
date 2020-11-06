import React, { useEffect, useState, useMemo, useCallback } from "react";
import DataTable from "react-data-table-component";
import getPeliculasListado from "../services/getPeliculasListado";
import { Button } from "semantic-ui-react";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Card from "@material-ui/core/Card";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
// import movies from "../components/movies";
import NuevaPelicula from "../components/NuevaPelicula";
import EditarPelicula from "../components/EditarPelicula";
// import ModalEditarVerPelicula from "../components/ModalEditarVerPelicula";
import "../components/GridPelicula.css";

// import getPelicula from "../services/getPelicula";

const GridPeliculas = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  // const [formPelicula, setFormPelicula] = useState({});

  const handleAction = (row, action) => {
    setShowModal(true);
    setId(row.id);
    // console.log("22", row, action);
    // const { id } = row;
    // getPelicula({ id })
    //   .then((data) => {
    //     console.log("data ", data[0]);
    //     // handleClose();
    //     setFormPelicula(data[0]);
    //     setShowModal(true);

    //     // console.log("formPelicula ", formPelicula);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const updateState = useCallback((state) => console.log(state));
  useEffect(() => {
    getPeliculasListado()
      .then((data) => {
        console.log("data VVVV ", data);
        setData(data);
        // setLitadoActores(data);
        // window.sessionStorage.setItem("token", jwt);
        // setJWT(jwt);
        // setGifs(gifs);
        // localStorage.setItem("lastKeyword", keyword);
        // console.log("user eff ", gifs);
        //   actions.setSubmitting(false);
      })
      .catch((err) => {
        console.log("error get peliculas listado ", err);
      });
  }, []);

  // const handleClose = () => {
  //   setShowModal(false);
  // };

  // const ModalContent = () => {
  //   return <EditarPelicula />;
  // };

  const columns = useMemo(() => [
    {
      name: "Nombre película",
      selector: "nombre",
      sortable: true,
    },
    {
      name: "Genero",
      selector: "genero",
      sortable: true,
      right: true,
    },
    {
      name: "Sinopsis",
      selector: "sinopsis",
      sortable: true,
      right: true,
    },
    {
      name: "Duración",
      selector: "duracion",
      sortable: true,
      right: true,
    },
    {
      cell: (record) => (
        <Button
          raised="true"
          primary
          size="mini"
          onClick={() => handleAction(record, "Editar")}
        >
          <EditRoundedIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (record) => (
        <Button
          raised="true"
          primary
          size="mini"
          onClick={() => handleAction(record, "Ver")}
        >
          <VisibilityOutlinedIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]);
  //   const handleChange = (state) => {
  //     // You can use setState or dispatch with something like Redux so we can use the retrieved data
  //     console.log("Selected Rows: ", state.selectedRows);
  //   };

  const handleCloseModal = () => {
    console.log("desde grid..");
    setShowModal(false);
  };

  return (
    <>
      <div className="App-Grid">
        <Card>
          <NuevaPelicula />
          <DataTable
            title="Películas"
            data={data}
            columns={columns}
            onSelectedRowsChange={updateState}
            // theme="dark"
            defaultSortField="nombre"
            pagination
            sortIcon={<SortIcon />}
          />
        </Card>
      </div>

      {showModal ? (
        <EditarPelicula
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          // formPelicula={formPelicula}
          id={id}
        />
      ) : null}
    </>
  );
};

export default GridPeliculas;
