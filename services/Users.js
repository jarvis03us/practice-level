// import axios from 'axios';
import axios from './axios';

const fetchAllUsers = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const createUsers = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};

const updateUsers = (FirstName, job, page) => {
  return axios.put(`/api/users/${page}`, { FirstName, job });
};

const deleteUsers = (id) => {
  return axios.delete(`/api/users/${id}`);
};

export { fetchAllUsers, createUsers, updateUsers, deleteUsers };
