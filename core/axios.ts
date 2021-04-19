import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();
console.log(cookies);
const Axios = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: "Bearer " + cookies.token,
  },
});

export { Axios };
