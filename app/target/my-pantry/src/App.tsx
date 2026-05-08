import {
  BrowserRouter,
  /*,
  Link,
  Route,
  Switch
  */
} from 'react-router-dom';

import SearchBar from "./components/searchbar.tsx"

function App() {

  return (
    <>
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}></BrowserRouter>
      <SearchBar/>
    </>
  )
}

export default App
