import { configureStore } from "@reduxjs/toolkit";
import session from "./reducers/session";

const store = configureStore({
  reducer: {
    session,
  },
});

export default store;
