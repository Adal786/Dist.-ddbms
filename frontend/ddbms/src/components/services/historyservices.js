import requests from './httpservices';

const historyServices = {
    get(id, userId) {
        id = id ? id : "";
        return requests.get(`/history/${userId}/${id}`);
    },
    read(userId) {
        return requests.get(`/history/${userId}`);
    },
    obtain() {
        return requests.get('/admin-history');
    },
};

export default historyServices;
