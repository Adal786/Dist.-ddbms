import requests from "./httpservices";

const AuthServices = {
  login(body) {
    return requests.post(`/login`, body);
  },
  register(body) {
    return requests.post(`/register`, body);
  },
  logout(body) {
    return requests.post(`/logout`, body);
  },
};

export default AuthServices;
