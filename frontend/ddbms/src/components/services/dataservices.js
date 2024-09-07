import requests from "./httpservices";

const DataServices = {
  get() {
    return requests.get(`/data`);
  },
};

export default DataServices;
