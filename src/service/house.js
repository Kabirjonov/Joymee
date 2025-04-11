import axios from "./api";
const HouseService = {
  async getHouses(page) {
    const { data } = await axios.get(`/houses/${page}`);
    return data;
  },
  async getCountHouse() {
    const { data } = await axios.get("/houses/counts");
    return data;
  },
  async getHousesSearch(house, page) {
    const { data } = await axios.post(`/search/${page}`, house);
    return data;
  },
  async deleteHouse(id) {
    const { data } = await axios.delete(`/house/${id}`);
    return data;
  },
  async postHouse(house) {
    const { data } = await axios.post("/houses", house, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
export default HouseService;
