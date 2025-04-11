import { createAsyncThunk } from "@reduxjs/toolkit";
import HouseService from "../service/house";

export const fetchHouses = createAsyncThunk(
    "houses/fetchHouses",
    async ({ page = 1, location,price,transactionType }, { rejectWithValue }) => {
      try {
        let response;
        if (location||price||transactionType) {
          response = await HouseService.getHousesSearch({location,price,transactionType}, page);
        } else {
          response = await HouseService.getHouses(page);
        }
        return response;
      } catch (error) {
        let errormessage = ''
        switch (error.response.status) {
          case 404:
            errormessage='House not found, Please try leter.'
            break;
        case 500:
          errormessage = 'Server error, Soon we fix it'
          break;
          default:
            errormessage='Opps, something wrong, please check leter'
            break;
        }
        return rejectWithValue(errormessage);
      }
    }
  );