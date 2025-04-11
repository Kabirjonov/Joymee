import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth";
import houseReducer from "../slice/houses";
import { saveHouses } from "../slice/saveHouse";
import { countSlice } from "../slice/count.House";
export default configureStore({
  reducer: {
    auth: authReducer,
    house: houseReducer,
    save: saveHouses,
    counts: countSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
