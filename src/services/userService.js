import api from './api'

export const getUsers = () => api.get('/users');

export const createUser = () => api.post('/users', data);

export const deleteUser = () => api.delete(`/users/${id}`);




