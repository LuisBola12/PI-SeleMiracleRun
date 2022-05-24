import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import '../../App.css'
import { usePostToDatabase } from "./usePostToDatabase";

export const BenefitsModal = ({ data, setData }) => {
  const { name, setName, cost, setCost, viewModal, setViewModal, addToTable } = usePostToDatabase(data, setData);
  return (
    <>
      <button className="create-button" onClick={() => setViewModal(true)}>
        Create New Benefit
      </button>
      <Modal className='modal-window' isOpen={viewModal}>
        <ModalHeader>
          <div>
            <h3>Insert New Benefit</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              type="text"
              maxLength="50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </FormGroup>

          <FormGroup>
            <label>Cost:</label>
            <input
              className="form-control"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            ></input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <button
            className="button create-button"
            onClick={() => {
              addToTable();
            }}
          >
            Insert
          </button>
          <button className="button cancel-button" onClick={() => {
            setViewModal(false)
            setName("");
            setCost("");
          }}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
};
