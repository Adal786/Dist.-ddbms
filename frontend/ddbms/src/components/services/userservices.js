import requests from './httpservices';

const userServices = {
    get(id) {
        id = id ? id : "";
        return requests.get(`/user/${id}`);
    },
};

export default userServices;
