import AddIngredientModal from './components/pantry_ingredients/add_ingredient/AddIngredientModal';
//import SearchRecipe from './components/search_bar/SearchRecipe';
import PantryRecipeList from './components/pantry_recipe_list/PantryRecipeList';
import "./App.css"
import PantryIngredientContainer from './components/pantry_ingredients/container/pantry_ingredient_container';
import Webcam from 'react-webcam';

function App() {
  return (
    <div className="container">
      <div>
        <PantryIngredientContainer/>
      </div>
      <div className="pantry-recipe-container">
        <PantryRecipeList/>
      </div>

    </div>
  )
}

export default App
