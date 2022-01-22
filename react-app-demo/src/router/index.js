import Home from '../views/home/index'
import List from '../views/list/index'

const routes = [
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/home/*',
    element: <Home/>
  },
  {
    path: '/list',
    element: <List/>
  }
]

export default routes