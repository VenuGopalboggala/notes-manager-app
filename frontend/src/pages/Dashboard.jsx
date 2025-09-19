import React, { useState, useEffect } from 'react';
import { getNotes, addNote, updateNote, deleteNote } from '../api/notes';
import Navbar from '../components/Navbar';
import NoteItem from '../components/NoteItem';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (error) {
      console.error('Could not fetch notes', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateNote(currentNoteId, { title, description });
      } else {
        await addNote({ title, description });
      }
      resetForm();
      loadNotes();
    } catch (error) {
      console.error('Error saving note', error);
    }
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setCurrentNoteId(note._id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIsEditing(false);
    setCurrentNoteId(null);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="form-container">
          <h2>{isEditing ? 'Edit Note' : 'Add a New Note'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <button type="submit">{isEditing ? 'Update Note' : 'Add Note'}</button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            )}
          </form>
        </div>
        <div className="notes-list">
          <h2>Your Notes</h2>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p>You have no notes yet. Add one!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;