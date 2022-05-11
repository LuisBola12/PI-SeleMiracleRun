import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
const dataPjs = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  {
    id: 5,
    personaje: "Edward Elric",
    anime: "Fullmetal Alchemist: Brotherhood",
  },
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];

export const CrudEmployee = () => {
  const [data, setData] = useState(dataPjs);
  const [viewModal, setViewModal] = useState(false);
  const [nombre,setNombre] = useState('');
  const [anime,setAnime] = useState('');
  return (
    <>
      <Container>
        <br />
        <Button color="primary" onClick={() => setViewModal(true)}>
          {" "}
          Create a New Employee
        </Button>
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Personaje</th>
              <th>Anime</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr>
                <td>{e.id}</td>
                <td>{e.personaje}</td>
                <td>{e.anime}</td>
                <td>
                  <Button color="primary"> Editar </Button>
                </td>
                <td>
                  <Button color="primary"> Eliminar </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal isOpen={viewModal}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={data.length + 1}
            ></input>
          </FormGroup>

          <FormGroup>
            <label>Personaje:</label>
            <input
              className="form-control"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></input>
          </FormGroup>

          <FormGroup>
            <label>Anime:</label>
            <input
              className="form-control"
              type="text"
              value={anime}
              onChange={(e) => setAnime(e.target.value)}
            ></input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              const newData = {
                id: data.length + 1,
                personaje: nombre,
                anime: anime,
              };
              setData([...data, newData]);
              setViewModal(false);
              setNombre("");
              setAnime("");
            }}
          >
            Insertar
          </Button>
          <Button color="danger" onClick={() => setViewModal(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
