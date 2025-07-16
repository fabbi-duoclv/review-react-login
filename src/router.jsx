import { createBrowserRouter } from "react-router";
import Todos from './features/Todos/Todos'
import Login from './features/Login/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;  
