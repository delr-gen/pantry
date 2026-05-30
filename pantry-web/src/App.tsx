import AddIngredientModal from './components/add_ingredient/AddIngredientModal';
import SearchRecipe from './components/search_bar/SearchRecipe';
import PantryRecipeList from './components/pantry_recipe/PantryRecipeList';
import "./App.css"
import RecipeModal from './components/view_recipe/RecipeModal';

function App() {

  return (
    <div className="container">
      <div>
        <SearchRecipe/>
        <AddIngredientModal/>
        <RecipeModal/>
      </div>
      <div>
        <PantryRecipeList/>
      </div>
    </div>
  )
}

export default App
