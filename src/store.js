import { configureStore } from "@reduxjs/toolkit";
import session from "./reducers/session";
import user from "./reducers/user";

const store = configureStore({
  reducer: {
    session,
    user,
  },
});

export default store;
