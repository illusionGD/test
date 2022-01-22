import { useRoutes } from 'react-router-dom'
import routes from './router/index'
import './App.less'

function App() {
  let element = useRoutes(routes);
  return element;
}

export default App;
