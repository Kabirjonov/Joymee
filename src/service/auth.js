import axios from "./api";
const AuthService = {
  async userRegister(user) {
    const { data } = await axios.post("/users", { user });
    return data;
  },
  async getUserHouses(){
    const {data}=await axios.get('/user/houses')
    return data
  },
  async userLogin(user) {
    const { data } = await axios.post("/users/login", { user });
    return data;
  },
  async getUser() {
    const { data } = await axios.get("/user");
    return data;
  },
  async getUsers() {
    const { data } = await axios.get("/users");
    return data;
  },
  async putUser(user) {
    const { data } = await axios.put("/users", user,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  async deleteUser() {
    const { data } = await axios.delete("/users");
    return { data };
  },
};
export default AuthService;
