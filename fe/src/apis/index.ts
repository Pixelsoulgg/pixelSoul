import axios from 'axios';
import queryString from 'query-string';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest'
};

const axiosInstance = axios.create({
  baseURL: 'https://api.pixelsoul.gg/api/v1',
  headers,
  paramsSerializer: {
    serialize: (params) => {
        return  queryString.stringify(params)
    }
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const getProfile = async(): Promise<any> => {
  const address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  return axiosInstance.get(`score/${address}`); 
}

