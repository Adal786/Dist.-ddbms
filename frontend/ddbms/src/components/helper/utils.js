import { toast } from 'react-toastify';

const Utils = {

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token)
      return true;

    return false;
  },

  me() {
    if (this.isLoggedIn()) {
      let str = localStorage.getItem('token');
      let obj = JSON.parse(str);
      obj = obj ? obj : {};

      return obj;
    }

    return null;
  },

  formDataToJSON(formData) {
    const jsonObject = {};

    formData.forEach((value, key) => {
      // Check if the key already exists in the jsonObject
      if (jsonObject.hasOwnProperty(key)) {
        // If it's an array, push the value
        if (Array.isArray(jsonObject[key])) {
          jsonObject[key].push(value);
        } else {
          // If it's a single value, convert it to an array with the existing value and the new value
          jsonObject[key] = [jsonObject[key], value];
        }
      } else {
        // const cleanedKey = key.replace(/\[\]$/, '');
        // If it's a single value (not an array), directly set the value
        jsonObject[key] = value;
      }
    });

    return jsonObject;
  },

};

export default Utils;