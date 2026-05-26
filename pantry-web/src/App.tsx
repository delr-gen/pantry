import AddIngredientModal from './components/add_ingredient/AddIngredientModal';
import SearchRecipe from './components/search_bar/SearchRecipe';
import PantryRecipe from './components/PantryRecipe';


function App() {

  return (
    <div>
      <SearchRecipe/>
      <AddIngredientModal/>
      <PantryRecipe></PantryRecipe>
    </div>
  )
}

export default App
