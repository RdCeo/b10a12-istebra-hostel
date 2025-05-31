import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b10a12-istebra-hostel-server.vercel.app/",
  // baseURL: "http://localhost:5000",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
