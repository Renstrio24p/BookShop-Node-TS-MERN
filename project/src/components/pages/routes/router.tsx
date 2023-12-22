import { createBrowserRouter } from "react-router-dom";
import CreateBooks from "../CreateBooks";
import Home from "../Home";
import ShowBook from "../ShowBook";
import EditBook from "../EditBook";
import DeleteBook from "../DeleteBook";
import NotFound from "../NotFound"; // Assuming you have a NotFound component

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: 'create',
        element: <CreateBooks />,
      },
      {
        path: "details/:id",
        element: <ShowBook />,
      },
      {
        path: "edit/:id",
        element: <EditBook />,
      },
      {
        path: "delete/:id",
        element: <DeleteBook />,
      },
      // Add a catch-all route for 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
