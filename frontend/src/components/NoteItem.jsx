import React from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="note-actions">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;