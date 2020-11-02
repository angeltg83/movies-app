import React, { useEffect, useState, useMemo, useCallback } from "react";
import DataTable from "react-data-table-component";
import getPeliculasListado from "../services/getPeliculasListado";
import { Button } from "semantic-ui-react";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Card from "@material-ui/core/Card";
import movies from "../components/movies";

import ModalEditarVerPelicula from "../components/ModalEditarVerPelicula";
import "../components/GridPelicula.css";

const GridPeliculas = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");

  const [infoModalRow, setInfoModalRow] = useState(null);
  //   const [thing, setThing] = useState();
  const handleAction = (row, action) => {
    console.log("22", row, action);
    setInfoModalRow(row);
    setAction(action);
    setShowModal(true);
  };
  const updateState = useCallback((state) => console.log(state));
  useEffect(() => {
    console.log("11111");
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
      .catch((err) => {});
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const ModalContent = () => {
    //   console.log("ssssss MODAL :  ",showModal)
    return <ModalEditarVerPelicula value={infoModalRow} action={action} />;
  };

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
          onClick={() => handleAction(record, "Editar")}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-pen-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
            />
          </svg>
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
          onClick={() => handleAction(record, "Ver")}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-binoculars-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z" />
          </svg>
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

  return (
    <>
      <div className="App-Grid">
        <Card>
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

      {showModal ? <ModalContent /> : null}
    </>
  );
};

export default GridPeliculas;
