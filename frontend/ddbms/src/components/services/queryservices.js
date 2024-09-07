import requests from './httpservices';

const queryServices = {
  rawQuery(body, id) {
    return requests.post(`/rawquery/${id}`, body);
  },
  query(body, id) {
    return requests.post(`/query/${id}`, body);
  },
};

export default queryServices;


