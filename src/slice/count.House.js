import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  rent: 0,
  sell: 0,
  isLoading: false,
};
export const countSlice = createSlice({
  name: "counts",
  initialState,
  reducers: {
    countHouseStart(state) {
      state.isLoading = true;
    },
    countHouseSeccess(state, action) {
      state.isLoading = false;
      state.infomations.count = action.payload?.totalCount;
      state.infomations.rent = action.payload?.rent;
      state.infomations.sell = action.payload?.sell;
    },
    countHouseFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { countHouseFail, countHouseSeccess, countHouseStart } =
  countSlice.actions;
export default countSlice.reducer;
