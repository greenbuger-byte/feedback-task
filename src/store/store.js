import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./users";

const store = configureStore({
  reducer: {
    userSlice,
  },
});

export default store;
