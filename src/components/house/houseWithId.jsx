import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Basic, CaruselComponent, SaveHouseId } from "../../ui";
import moment from 'moment'
function HouseWithId() {
  const { id } = useParams(); // URL'dan ID ni olish
  const house = useSelector((state) =>
    state.house.houses.find((h) => h._id === id)
  );
  if (!house) {
    return (
      <Basic>
        <div className="text-center mt-5">
          <h2>House not found</h2>
          <p>Sorry, we couldn't find the house you are looking for.</p>
        </div>
      </Basic>
    );
  }

  return (
    <Basic>
      <SaveHouseId id={house._id}/>
      <div className="row">
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
                  <i class="bi bi-geo-alt-fill text-warning mb-1"></i>
                  {" " + house.district + " " + house.region + " " + house.city}
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
                  Author:{" "}
                  <strong>
                    {house.author.firstName} {house.author.lastName}
                  </strong>
                </li>
                <li className="list-group-item d-flex">
                  Phone: <strong>{house.author.phone}</strong>
                </li>
                <li className="list-group-item d-flex">
                  Email: <strong>{house.author.email}</strong>
                </li>
              <li className="list-group-item d-flex">
              Create at:
              <strong>{moment(house.createdAt).format("DD MMM,YYYY")}</strong>
            </li>
          </ul>
        </div>
      </div>
    </Basic>
  );
}

export default HouseWithId;