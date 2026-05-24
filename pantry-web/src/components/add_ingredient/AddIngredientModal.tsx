import { useState } from 'react';
import './AddIngredientModal.css';
import { Modal, Button } from 'react-bootstrap';
import AddIngredientPrompt from './AddIngredientPrompt';


export default function AddIngredientModal() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setIngredients([initialValues]);
  }

  const initialValues = {
    name: "",
    quantity: "",
    unit: "",
    date_bought: "",
    expiration_date: ""
  }

  const [ingredients, setIngredients] = useState([initialValues]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const { name, value } = event.target;
      let newIngredients = [...ingredients];
      newIngredients[i][name] = value;
      setIngredients(newIngredients);
  }

  const handleAddIngredientPrompt = () => {
    setIngredients([...ingredients, initialValues])
  }

  async function submit_ingredient(event: React.ChangeEvent<HTMLFormElement>) {
    // prevent propagation
    event.preventDefault();

    //alert(`${ingredients[0].name}'`);
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
            <fieldset>
                <legend>Ingredients</legend>
                {ingredients.map((ingredient, i) => (
                  <div key={i}>
                    <AddIngredientPrompt handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, i)}/>
                  </div>
                ))}
            </fieldset>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </form>
          <Button type="submit" onClick={handleAddIngredientPrompt}>+</Button>
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
