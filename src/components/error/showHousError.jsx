import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

function ShowHousError({ onRetry }) {
  const { error } = useSelector((state) => state.house);

  return (
    <div className="text-center">
      <h1 className="fw-bold text-danger">{error}</h1>
      {onRetry && (
        <Button className="bg-darkblue" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export default ShowHousError;
