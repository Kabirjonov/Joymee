import React, {useState } from "react";
import { Basic, Button, Input } from "../../ui";
import { Head } from "../home";
import {YMaps,Map,Placemark} from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { posthouseFail, postHouseSeccess, postHouseStart } from "../../slice/houses";
import HouseService from "../../service/house";
import {toast}from 'react-toastify'
function Dashboard() {
  const dispatch = useDispatch()
  const {isLoading}=useSelector(state=>state.house)

  const [files, setFiles] = useState(null);
  const [price, setPrice] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [comment, setComment] = useState("");
  const [defaultMap, setDefaultMap] = useState([41.311081, 69.240562]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postHouseStart());
    const formData = new FormData();
    formData.append("price", price);
    formData.append("district", district);
    formData.append("region", region);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("coordinates", JSON.stringify(coordinates));
    formData.append("transactionType", transactionType);
    formData.append("propertyType", propertyType);
    formData.append("comment", comment);
    if(files){
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
   
    try {
      console.log(formData)
      await HouseService.postHouse(formData);
      dispatch(postHouseSeccess());
      setPropertyType('')
      setComment('')
      toast.success('House is seccesful upload')
      setFiles(null)
      setTransactionType('')
      setPrice('')
      setDistrict('')
      setRegion('')
      setCity('')
      setArea('')
      setCoordinates([])
    } catch (error) {
      toast.error(error.response.data?.message || "Something wrong")
      dispatch(posthouseFail(error.response.data || "Something wrong"));
    }
  };
  
  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setCoordinates(coords);
    setDefaultMap(coords);
  };
const handleChenge = (e)=>{
  setFiles(e.target.files)
}
  return (
    <Basic title="Add new items" name="Dashboard">
      <Head classNameDiv="text-center" title="Add new item" />
      <form className="row">
        <div className="col-md-6 col-sm-12">
            <input
              type="file"
              id="fileInput"
              className="form-control"
              multiple
              onChange={handleChenge}
            />
        </div>
        <div className="col-md-6 col-sm-12">
          <Input type="number" label="Price $" state={price}setState={setPrice}/>
        </div>
        <div className="col-md-6 col-sm-12">
          <Input label="Ristrict"setState={setDistrict}state={district} />
        </div>
        <div className="col-md-6 col-sm-12">
        <Input label="Region" state={region} setState={setRegion} />

        </div>
        <div className="col-md-6 col-sm-12">
          <Input label="City" setState={setCity} state={city} />
        </div>
        <div className="col-md-6 col-sm-12">
          <Input label="Area" type="number" state={area} setState={setArea} />
        </div>
        <div className="col-md-6 col-sm-12">
          <Input
            label="Transaction Type"
            name="Transaction Type"
            type={"dropdown"}
            options={["sell", "rent"]}
            setState={setTransactionType}
            state={transactionType}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Input
            label="Property Type"
            name="Property Type"
            type={"dropdown"}
            setState={setPropertyType}
            state={propertyType}
            options={["house","office", "apartment"]}
          />
        </div>
        <div className="col-sm-12">
          <Input
            label="Comment"
            name="comment"
            type="textarea"
            state={comment}
            setState={setComment}
            required={false}
          />
        </div>
      <div className="col-sm-12 px-3">
      <YMaps>
          <Map
            defaultState={{
              center: defaultMap, 
              zoom: 11,
            }}
            width="100%"
            height="400px"
            onClick={handleMapClick}
          >
            <Placemark geometry={coordinates} />
          </Map>
        </YMaps>
      </div> 
      <div className="mt-2 text-end">
      <Button onClick={handleSubmit}disabled={isLoading}>{isLoading?'Sending...':"Send"}</Button>
      </div>
      </form>
    </Basic>
  );
}

export default Dashboard;