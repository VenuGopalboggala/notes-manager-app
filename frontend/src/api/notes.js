import axios from 'axios';
const API_URL = 'http://localhost:5001/api/notes';

export const getNotes = () => axios.get(API_URL);
export const addNote = (noteData) => axios.post(API_URL, noteData);
export const updateNote = (id, noteData) => axios.put(`${API_URL}/${id}`, noteData);
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);