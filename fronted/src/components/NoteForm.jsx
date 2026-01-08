import React, { useState, useEffect } from "react";
import axios from "axios";

const NoteForm = ({ fetchNotes, userId, editNote, setEditNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    }
  }, [editNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Fill all fields");

    if (editNote) {
      await axios.put(`http://localhost:5000/api/notes/${editNote._id}`, { title, content });
      setEditNote(null);
    } else {
      await axios.post("http://localhost:5000/api/notes", { title, content, userId });
    }

    setTitle("");
    setContent("");
    fetchNotes();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>
      <button type="submit">{editNote ? "Update Note" : "Add Note"}</button>
    </form>
  );
};

export default NoteForm;
