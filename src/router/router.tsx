import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Theme from "../components/Theme";
import SeeThemes from "../components/SeeThemes";
import AddTestPage from "../components/AddTestPage";
import TakeTest from "../components/TakeTests";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Theme />,
      },
      {
        path: "themes",
        element: <SeeThemes />,
      },
      {
        path: "themes/:themeName",
        element: <AddTestPage />,
      },
      {
        path: "themes/test/:themeName",
        element: <TakeTest />,
      },
    ],
  },
]);
