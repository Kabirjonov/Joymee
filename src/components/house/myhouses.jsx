import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Basic, Button, CaruselComponent } from "../../ui";
import moment from "moment";
import {
  getUserHousesFail,
  getUserHousesSeccess,
  getUserHousesStart,
  posthouseFail,
  postHouseSeccess,
  postHouseStart,
} from "../../slice/houses";
import HouseService from "../../service/house";
import { toast } from "react-toastify";
import ShowHousError from "../error/showHousError";
import AuthService from "../../service/auth";
function HouseWithId() {
  const dispatch = useDispatch();
  const { myHouses,isLoading } = useSelector((state) => state.house);
  const getUserHouses = async () => {
    dispatch(getUserHousesStart());
    try {
      const { houses } = await AuthService.getUserHouses();
      dispatch(getUserHousesSeccess(houses));
    } catch (error) {
      dispatch(getUserHousesFail());
    }
  };
  useEffect(() => {
    getUserHouses();
  }, []);
  const handleDelete = async (id) => {
    dispatch(postHouseStart());
    try {
      await HouseService.deleteHouse(id);
      dispatch(postHouseSeccess());
      getUserHouses()
      toast.success('House is deleted succesfully')
    } catch (error) {
      toast.error(error.response.data?.message || "Something wrong")
      dispatch(posthouseFail(error.response.data));
    }
  };
  return (
    <Basic>
      {myHouses.length === 0 ? (
        <ShowHousError message="You have not any houses yet!" />
      ) : (
        myHouses.map((house, index) => (
          <div className="row" key={index}>
            <div className="d-flex justify-content-end my-1">
              <Button
                onClick={() => handleDelete(house._id)}
                className="bg-danger text-light"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <CaruselComponent height="500px" fileUrls={house.fileUrls} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  Location:
                  <strong>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://yandex.com/maps/?ll=${house.coordinates[1]},${house.coordinates[0]}&z=18&pt=${house.coordinates[1]},${house.coordinates[0]}`}
                    >
                      <i className="bi bi-geo-alt-fill text-warning mb-1"></i>
                      {" " +
                        house.district +
                        " " +
                        house.region +
                        " " +
                        house.city}
                    </a>
                  </strong>
                </li>
                <li className="list-group-item d-flex">
                  Price:<strong>{house.price}$</strong>
                </li>
                <li className="list-group-item d-flex">
                  Transaction Type:<strong>{house.transactionType}</strong>
                </li>
                <li className="list-group-item d-flex">
                  Area:<strong>{house.area} m²</strong>
                </li>
                <li className="list-group-item d-flex">
                  Property Type:<strong>{house.propertyType}</strong>
                </li>
                {house.comment && (
                  <li className="list-group-item d-flex">
                    About:<strong>{house.comment}</strong>
                  </li>
                )}
                <li className="list-group-item d-flex">
                  Create at:
                  <strong>{moment(house.createdAt).format("DD MMM,YYYY")}</strong>
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </Basic>
  );
  
}

export default HouseWithId;
