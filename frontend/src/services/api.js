import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:3000/api",
});


// ADD TOKEN TO REQUESTS
API.interceptors.request.use(

  (req) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;
    }

    return req;
  },

  (error) => {

    return Promise.reject(error);
  }
);

export default API;