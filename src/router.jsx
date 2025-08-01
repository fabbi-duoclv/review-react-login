import { createBrowserRouter } from "react-router";
import Todos from './features/Todos/Todos'
import Login from './features/Login/Login'
import Signup from './features/signup/Signup'
import { ProtectProvider } from "./Providers/ProtectProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element:
    <ProtectProvider>
      <Todos />
    </ProtectProvider>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
