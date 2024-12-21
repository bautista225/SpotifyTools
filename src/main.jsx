import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
// import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/SpotifyTools/'}>
    <Routes>
        <Route
          path='/'
          element={
            <div>
              <h1>Hello World</h1>
              <Link to='about'>About Us</Link>
            </div>
          }
        />
        <Route path='/about' element={<div>About</div>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
