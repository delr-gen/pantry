import {
  BrowserRouter,
  /*,
  Link,
  Route,
  Switch
  */
} from 'react-router-dom';

import SearchRecipe from './components/SearchRecipe';

function App() {

  return (
    <div>
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}></BrowserRouter>
      <SearchRecipe/>
    </div>
  )
}

export default App
