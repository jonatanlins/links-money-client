import apisauce from "apisauce";
import { getUser } from "./auth";

const baseURL = "http://localhost:3333";

const api = apisauce.create({ baseURL });

api.addRequestTransform((request) => {
  const auth = getUser();

  if (auth?.session?.token) {
    request.headers.authorization = `Bearer ${auth.session.token}`;
  }
});

export default api;
