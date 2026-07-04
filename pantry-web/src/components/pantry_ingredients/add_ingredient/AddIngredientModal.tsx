import { useState } from 'react';
import './AddIngredientModal.css';
import { Modal, Button } from 'react-bootstrap';
import AddIngredientPromptItem from './AddIngredientPromptItem';
import FileUpload from './file_upload/FileUpload';
import WebCamCapture from './file_upload/WebCamCapture';

interface addIngredientModalProps {
  setIngredientListIsUpdated: (isUpdated: boolean) => void
}

export default function AddIngredientModal( { setIngredientListIsUpdated }: addIngredientModalProps) {
  const initialValues = {
    name: "",
    quantity: 1,
    unit: "unit",
    date_bought: new Date().toISOString().split('T')[0],
    expiration_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }
  const [ingredients, setIngredients] = useState([initialValues]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setIngredients([initialValues]);
  }

  const handleAddIngredientPrompt = () => {
    setIngredients([...ingredients, initialValues])
  }

  async function postIngredients(event: React.ChangeEvent<HTMLFormElement>) {
    // prevent propagation
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/add_pantry_ingredients`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredients)
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      else {
        return true;
      }
    }
    catch (error: unknown) {
      if (error instanceof Error){
          console.error(error.message);
          return false;
      }
    }   
  }

  const handleSubmitIngredients = (event: React.ChangeEvent<HTMLFormElement>) => {
    postIngredients(event).then(response => {
      if (response) {
        alert("Success");
        setIngredientListIsUpdated(false);
        handleClose();
      }
      else {
        alert("An error has occured");
      }
    });
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
          <FileUpload
            ingredients={ingredients}
            setIngredients={setIngredients}>
          </FileUpload>
          <WebCamCapture></WebCamCapture>
          <form onSubmit={handleSubmitIngredients}>
            <fieldset>
                {ingredients.map((ingredient, i) => (
                  <div key={i}>
                    Ingredient #{i+1}:
                    <AddIngredientPromptItem 
                      ingredients={ingredients}
                      setIngredients={setIngredients}
                      setIngredientListIsUpdated={setIngredientListIsUpdated}
                      i={i}
                    />
                    <br></br>
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
