import axios from 'axios';
import queryString from 'query-string';
import { Player } from '../types';
import { getApiEndpoint } from '../utils';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest'
};

const axiosInstance = axios.create({
  baseURL: 'https://pixelsoul-api.dequest.io/',
  headers,
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export const getProfile = async(): Promise<any> => {
  const address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  return axiosInstance.get(`profile/${address}`); 
}

