import {
  BrowserRouter,
  /*,
  Link,
  Route,
  Switch
  */
} from 'react-router-dom';

import SearchBar from "./components/searchbar.tsx"
import Orderedlist from './components/orderedlist.tsx';

function App() {

  return (
    <div>
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}></BrowserRouter>
      <SearchBar/>
      <Orderedlist/>
    </div>
  )
}

export default App
