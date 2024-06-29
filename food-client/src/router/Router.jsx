import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/menu/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <PrivateRouter>
            <Menu/>
          </PrivateRouter>
        )
      },
      {
        path: "/cart-page",
        element: <CartPage/>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
]);

export default router;
