const Axios = require("axios");

const axios = () => {
  const axiosConnect = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  axiosConnect.interceptors.request.use(
    function (config) {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token ?? ''}`,
      };
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosConnect.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        setTimeout(()=>{
          window.location.pathname = "/auth/login";
        }, 5000);
      }
      return Promise.reject(error)
    }
  );

  return axiosConnect;
};

export default axios();