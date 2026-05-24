import { useState } from 'react';
import AddIngredientPromptItem from './AddIngredientPromptItem';
import './AddIngredientModal.css';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import AddIngredientPrompt from './AddIngredientPrompt';


export default function AddIngredientModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function submit_ingredient(event) {
    // prevent propagation
    event.preventDefault();
  
    const data = new FormData(event.target);
    const name = data.getAll("name");
    const quantity = data.getAll("quantity");
    const unit = data.getAll("unit")
    alert(`${name} ${quantity} ${unit}'`);
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Ingredients
      </Button>

      <Modal className="modal" show={show} onHide={handleClose} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Add Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submit_ingredient}>
            <ListGroup>
              <ListGroupItem className="add-ingredient-prompt-item">
                  <AddIngredientPrompt number={1}/>
              </ListGroupItem>
              <AddIngredientPromptItem number={2}/>
            </ListGroup>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
