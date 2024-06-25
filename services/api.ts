import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const createToDoList = (title: string) => {
  return axios.post(`${API_URL}/todolists`, { title }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteToDoList = (id: number) => axios.delete(`${API_URL}/todolists/${id}`);

export const addToDoItem = (id: number, content: string) => axios.post(`${API_URL}/todolists/${id}/items`, { content }, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deleteToDoItem = (id: number) => axios.delete(`${API_URL}/items/${id}`);

export const getToDoListItems = (id: number) => axios.get(`${API_URL}/todolists/${id}/items`);

export const updateToDoItemStatus = (id: number, completed: boolean) => axios.patch(`${API_URL}/items/${id}`, { completed }, {
  headers: {
    'Content-Type': 'application/json',
  },
});
