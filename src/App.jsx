import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./ui/Layout";
import Error from "./ui/Error";
import { loader as menuLoader } from "./features/menu/Menu";
import { loader as orderLoader } from "./features/order/Order";

import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import Home from "./ui/Home";
import Order from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
