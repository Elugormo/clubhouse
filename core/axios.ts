import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:6000",
  withCredentials: true,
});

export default instance;
