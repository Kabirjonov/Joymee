import React, { useState } from "react";
import { Button, Input } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";

import { fetchHouses } from "../../../helpers/fetchUserExtraRudex";
function Search() {
  const [location, setLocation] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.house);


  const handleSearch = async () => {
    dispatch(fetchHouses({page:1,location,price,transactionType}));
  };
  return (
    <div className="d-flex shadow bg-light rounded-top py-2 px-4 align-items-center ">
      <Input label="City/Street" state={location} setState={setLocation} />
      <Input
        label="Type"
        state={transactionType}
        setState={setTransactionType}
        type="dropdown"
        options={["rent", "sell"]}
      />
      <Input label="Price $" type="number" state={price} setState={setPrice} />
      <Button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}

export default Search;
