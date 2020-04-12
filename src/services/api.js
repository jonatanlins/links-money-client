import apisauce from 'apisauce';

const baseURL = 'http://localhost:3333';

const api = apisauce.create({ baseURL });

export default api;
