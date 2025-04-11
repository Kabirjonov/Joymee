import { Card, CardBody, CardText, CardSubtitle, CardLink } from "reactstrap";
import { Button, CaruselComponent, Image, SaveHouseId } from "../../../ui";
import { Link } from "react-router-dom";
import ShowHousError from "../../error/showHousError";
import { useSelector } from "react-redux";

function BlogCard() {
  const { houses } = useSelector((state) => state.house);
  return (
    <div className="py-5 text-start">
      {houses.length === 0 ? (
        <ShowHousError/>
      ) : (
        <div className="row">
          {houses.map((house, index) => (
            <div className="col-sm-6 col-md-6 col-lg-4 mb-2" key={index}>
              <Card className="shadow-lg p-2 mb-2 d-grid align-items-center">
                <SaveHouseId id={house._id} />
                <CaruselComponent fileUrls={house.fileUrls} id={house._id} />
                <CardBody className="">
                  <div className="m-2 d-flex justify-content-between">
                    <CardSubtitle
                      className={`p-2 fw-bold ${
                        house.transactionType === "sell"
                          ? "logo_color_text bg-darkblue"
                          : "logo_color_bg"
                      }`}
                    >
                      For {house.transactionType}
                    </CardSubtitle>
                  </div>
                  <div className="d-flex justify-content-start align-items-stretch">
                    <span>Location:</span>
                    <CardLink
                      style={{ marginLeft: "5px" }}
                      tag="a"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://yandex.com/maps/?ll=${house.coordinates[1]},${house.coordinates[0]}&z=18&pt=${house.coordinates[1]},${house.coordinates[0]}`}
                    >
                      {house.district + " " + house.region + " " + house.city}
                    </CardLink>
                  </div>
                  <CardText> {house.comment}</CardText>
                  <CardSubtitle className="d-flex align-items-center m-2">
                    <Image circle height="50" url={house.author.fileUrl} />
                    {house.author.firstName + " " + house.author.lastName}
                    <br />
                    {house.author.phone}
                  </CardSubtitle>
                  <div className="d-flex justify-content-between align-items-stretch">
                    <Button>{house.price}$</Button>
                    <Link
                      to={`/house/${house._id}`}
                      className="btn  btn-outline-dark"
                    >
                      Show more
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogCard;
