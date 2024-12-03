import requests from './httpservices';

const historyServices = {
    get(id, userId) {
        id = id ? id : "";
        return requests.get(`/history/${userId}/${id}`);
    },
    read(userId) {
        return requests.get(`/history/${userId}`);
    },
};

export default historyServices;
