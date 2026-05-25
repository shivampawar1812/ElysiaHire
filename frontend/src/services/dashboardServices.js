import axios from "axios";


const API = axios.create({

  baseURL: "http://localhost:3000/api",
});


// ADD TOKEN IN EVERY REQUEST
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {

    req.headers.Authorization =
      `Bearer ${token}`;
  }

  return req;
});


// ======================================
// GET DASHBOARD DATA
// ======================================

export const getDashboardData =
async () => {

  const response =
    await API.get("/dashboard");

  return response.data;
};


// ======================================
// UPDATE PROFILE
// ======================================

export const updateProfile =
async (profileData) => {

  const response =
    await API.put(
      "/profile/update",
      profileData
    );

  return response.data;
};


// ======================================
// UPLOAD RESUME
// ======================================

export const uploadResume =
async (formData) => {

  const response =
    await API.post(

      "/resume/upload",

      formData,

      {
        headers: {
          "Content-Type":
          "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const uploadProfilePhoto =
async (formData) => {

    const response =
    await axios.post(

        "http://localhost:3000/api/profile/upload-photo",

        formData,

        {

            headers: {

                Authorization:
                `Bearer ${
                    localStorage.getItem(
                        "token"
                    )
                }`,
            },
        }
    );

    return response.data;
};