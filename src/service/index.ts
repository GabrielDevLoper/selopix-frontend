import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:3333/selopix/v1",
  headers: {
    Authorization: `Bearer ${cookies["@selopix.token"]}`,
  },
});

export { api };
