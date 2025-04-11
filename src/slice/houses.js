import { createSlice } from "@reduxjs/toolkit";
import { fetchHouses } from "../helpers/fetchUserExtraRudex";
const initialState = {
  isLoading: false,
  houses: [],
  myHouses: [],
  error: null,
  page: 1,
  totalPage: 0,
};
export const houseSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {
    postHouseStart(state) {
      // postHouse functions also use for delete house in MyHouses component
      state.isLoading = true;
    },
    postHouseSeccess(state) {
      state.isLoading = false;
    },
    posthouseFail(state, action) {
      state.isLoading = false;
      state.error = action.payload?.message;
    },
    getUserHousesStart: (state) => {
      state.isLoading = true;
    },
    getUserHousesSeccess: (state, action) => {
      state.isLoading = false;
      state.myHouses = action.payload;
    },
    getUserHousesFail: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.houses = action.payload.houses;
        state.error = null;
        state.totalPage = action.payload.totalPage;
        state.page = action.payload.page;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.isLoading = false;
        state.houses = [];
        state.totalPage = 0;
        state.error = action.payload;
        console.log(action);
      });
  },
});

export const {
  getUserHousesFail,
  getUserHousesSeccess,
  getUserHousesStart,
  postHouseSeccess,
  postHouseStart,
  posthouseFail,
} = houseSlice.actions;
export default houseSlice.reducer;
