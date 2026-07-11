import PantryRecipeList from './components/pantry_recipe_list/PantryRecipeList';
import "./App.css"
import PantryIngredientContainer from './components/pantry_ingredients/container/pantry_ingredient_container';
import { useState } from 'react';


function App() {
  const [ingredientListIsUpdated, setIngredientListIsUpdated] = useState(false);
  return (
    <div className="container">
      <div>
        <PantryIngredientContainer
          ingredientListIsUpdated={ingredientListIsUpdated}
          setIngredientListIsUpdated={setIngredientListIsUpdated}
        />
      </div>
      <div className="pantry-recipe-container">
        <PantryRecipeList
          ingredientListIsUpdated={ingredientListIsUpdated}
        />
      </div>
    </div>
  )
}

export default App
