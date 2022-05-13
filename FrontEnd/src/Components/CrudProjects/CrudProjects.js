import React, { useState } from 'react'
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import '../../App.css'
import "bootstrap/dist/css/bootstrap.min.css";




const database = [
  { id: 1, name: "Gym", actualCost: 20000 },
  { id: 2, name: "Transporte", actualCost: 300000 },
  { id: 3, name: "Fisioterapia", actualCost: 40000 },


];

const CrudProjects = () => {

  const [data, setData] = useState(database);
  const [viewModal, setViewModal] = useState(false);
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);


  return (
    <div>CrudProjects</div>
  )
}

export default CrudProjects