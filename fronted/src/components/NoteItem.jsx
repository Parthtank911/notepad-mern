import React from "react";
import axios from "axios";

const NoteItem = ({ note, fetchNotes, setEditNote }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/notes/${note._id}`);
    fetchNotes();
  };

  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="buttons">
        <button onClick={() => setEditNote(note)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;
