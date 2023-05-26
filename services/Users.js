// import axios from 'axios';
import axios from './axios';

const fetchAllUsers = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const createUsers = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};

export { fetchAllUsers, createUsers };
