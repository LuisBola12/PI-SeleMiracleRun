import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import '../../App.css'
import { usePostToDatabase } from "./usePostToDatabase";

export const VolDeductionsModal = ({ data, setData }) => {
  const { name, setName, viewModal, setViewModal, addToTable } = usePostToDatabase(data, setData);
  return (
    <>
      <button className="create-button" onClick={() => setViewModal(true)}>
        Create New Voluntary Deduction
      </button>
      <Modal className='modal-window' isOpen={viewModal}>
        <ModalHeader>
          <div>
            <h3>Insert New Voluntary Deduction</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              type="text"
              value={name}
              maxLength="50"
              onChange={(e) => setName(e.target.value)}
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
          }}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
};
