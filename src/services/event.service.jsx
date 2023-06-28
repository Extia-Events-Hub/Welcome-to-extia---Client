import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL_V2;

console.log(baseUrl)

export const eventService = {
  index: () => {
    return axios.get(baseUrl + "/events");
  },
  registerEvent: (data) => {
    return axios.post(baseUrl + "/participants/", data);
  },
  delete: (eventId) => {
    return axios.delete(baseUrl + "/events/" + eventId);
  },
};
