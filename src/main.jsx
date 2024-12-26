import { createRoot } from "react-dom/client";
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const router = createBrowserRouter(createRoutesFromElements(<Route basename={import.meta.env.DEV ? '/' : '/SpotifyTools/'} path='*' element={<App />} />));

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}  >
      <App />
    </RouterProvider>
  </Provider>
);
