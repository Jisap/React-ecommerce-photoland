import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,                       // http://localhost:1337/api
  headers: {
    Authorization: 'bearer ' + process.env.REACT_APP_API_TOKEN, // token de strapi
  },
});
