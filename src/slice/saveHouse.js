import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../helpers/manage-localstory";

function loadSaveHouseId() {
  const saveHouse = JSON.parse(getItem("saveIds")) | [];
  return saveHouse;
}
const initialState = {
  saveHouses: [],
  isLoading: false,
};
export const saveHouses = createSlice({
  name: "save",
  initialState,
  reducers: {
    addHouse: (state, action) => {
    //   const id = action.payload;
    //   setItem("saveIds", JSON.stringify([id]));
    //   state.saveHouses.push(id);
    console.log('<-------------------',action.payload)
    },
  },
});
export const { addHouse } = saveHouses.actions;
export default saveHouses.reducer;
