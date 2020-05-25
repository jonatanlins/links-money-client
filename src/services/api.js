import axios from "axios";
import { getUser } from "./auth";

const baseURL = "http://594d97eb.ngrok.io";

const api = axios.create({ baseURL });

api.interceptors.request.use(async (request) => {
  const auth = getUser();

  if (auth?.session?.token) {
    request.headers.Authorization = `Bearer ${auth.session.token}`;
  }

  return request;
});

export default api;
