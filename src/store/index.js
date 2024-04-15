import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer.js";

const store = configureStore({
  reducer: {
    root: reducer,
  },
});

export default store;
