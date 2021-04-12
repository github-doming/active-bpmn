import axios from 'axios';

export const postJson = (url, params) => {
  return axios.post(url, params, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  })
};
