import AddIngredientModal from './components/add_ingredient/AddIngredientModal';
//import SearchRecipe from './components/search_bar/SearchRecipe';
import PantryRecipeList from './components/pantry_recipe_list/PantryRecipeList';
import "./App.css"
//import 'react-bootstrap-typeahead/css/Typeahead.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="container">
      <div>
        <AddIngredientModal/>
      </div>
      <div className="pantry-recipe-container">
        <PantryRecipeList/>
      </div>
    </div>
  )
}

export default App
