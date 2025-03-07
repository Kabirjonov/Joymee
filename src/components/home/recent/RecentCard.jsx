import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { CardBody, CardText, CardSubtitle, CardLink } from "reactstrap";
import { Link } from "react-router-dom";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import Skeleton from "react-loading-skeleton";
import Carousel from "../carousel/carousel";
import { FaHeart } from "react-icons/fa6";
import { BiSolidShow } from "react-icons/bi";

export default function RecentCard({ houses }) {
  const [likedStates, setLikedStates] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  useEffect(() => {
    const initialLikedStates = {};
    const initialLikeCounts = {};
    houses.forEach((house) => {
      initialLikedStates[house._id] = false;
      initialLikeCounts[house._id] = house.like;
      updateView(house._id)
    });
    setLikedStates(initialLikedStates);
    setLikeCounts(initialLikeCounts);

    async function updateView(id) {
      console.log('This card is watched',id)
      await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/views/${id}`);
    }
  }, [houses]);
  if (!houses) {
    return (
      <div className="mt-5">
        <Skeleton height={100} />
      </div>
    );
  }
  async function handleLike(id) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/blog/${id}`,
        {
          liked: !likedStates[id]
        }
      );
      if (response.status === 200) {
        setLikedStates((prevStates) => ({
          ...prevStates,
          [id]: !prevStates[id]
        }));

        setLikeCounts((prevCounts) => ({
          ...prevCounts,
          [id]: prevCounts[id] + (likedStates[id] ? -1 : 1)
        }));
      }
    } catch (err) {
      console.error("Error liking the house:", err);
    }
  }

  const [springs, api] = useSpring(() => ({
    from: { x: 0 }
  }));
  const handleClick = () => {
    api.start({
      from: {
        x: 0
      },
      to: {
        x: 100
      }
    });
  };
  return (
    <>
      {houses.length === 0 ? (
        <>
          <h3
            className="heading_h1 text-center mt-5"
            style={{ textTransform: "initial" }}
          >
            Xech qanday elon mavjud emas!
          </h3>
        </>
      ) : (
        <div className="row mtop">
          {houses.map((house) => (
            <div className="col-sm-6 col-lg-4 mb-2" key={house._id}>
              <Card
                className="shadow-lg border-0 p-2 mb-2 d-grid align-items-center"
                data-aos="flip-down"
                style={{
                  ...springs
                }}
              >
                <Carousel house={house} id={house._id} show={true} />
                <CardBody className="">
                  <div className="m-2 d-flex justify-content-between">
                    <CardSubtitle
                      className="p-1 text-center w-25 align-items-center"
                      style={
                        house.type === "rent"
                          ? { background: "var(--p)", color: "var(--while)" }
                          : {
                              background: "rgba(255, 152, 0, 0.1)",
                              color: "rgb(255, 152, 0)",
                              fontWeight: 600
                            }
                      }
                    >
                      For {house.type}
                    </CardSubtitle>
                    <div className="show_status_body_card">
                      <div className="d-grid text-center">
                        <BiSolidShow />
                        {house.views}
                      </div>
                      <div className="d-grid text-center">
                        {likedStates[house._id] ? (
                          <FaHeart
                            className="text-danger"
                            onClick={() => handleLike(house._id)}
                          />
                        ) : (
                          <FaHeart onClick={() => handleLike(house._id)} />
                        )}
                        {likeCounts[house._id]} {/* Like sonini ko'rsatish */}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-stretch">
                    <i className="bi bi-geo-alt-fill text-warning mb-1"></i>
                    <CardLink
                      className="font-weight-light"
                      style={{ color: "var(--p)", marginLeft: "5px" }}
                      tag="a"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://yandex.com/maps/?ll=${house.coordinates[1]},${house.coordinates[0]}&z=18&pt=${house.coordinates[1]},${house.coordinates[0]}`}
                    >
                      {house.viloyat + " " + house.shaxar + " " + house.tuman}
                    </CardLink>
                  </div>
                  <CardText>{house.comment}</CardText>
                  <CardSubtitle className="d-flex align-items-center m-2">
                      <img
                        src={house.author.fileUrl}
                        className="rounded-circle border border-dark mx-1"
                        style={{
                          height: "50px",
                          width: "50px",
                          objectFit: "cover"
                        }}
                      />
                    {house.author.firstName + " " + house.author.lastName}
                    <br />
                    {house.author.phone}
                  </CardSubtitle>
                  <div className="d-flex justify-content-between align-items-stretch">
                    <button className="btn btn-warning">
                      {house.price}
                      <MdAttachMoney />
                    </button>
                    <Link
                      to={`/One`}
                      state={{ id: house._id }}
                      className="btn btn-outline-dark"
                    >
                      Koproq korish
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
