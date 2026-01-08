import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const fetchNotes = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/notes?userId=${userId}`);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userId]);

  const handleLogout = () => {
    setUserId(null);
    setNotes([]);
    setEditNote(null);
    setIsSignup(false);
  };

  if (!userId) {
    return isSignup ? <Signup setUserId={setUserId} /> : <Login setUserId={setUserId} setIsSignup={setIsSignup} />;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Notepad</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <NoteForm fetchNotes={fetchNotes} userId={userId} editNote={editNote} setEditNote={setEditNote} />
      <NoteList notes={notes} fetchNotes={fetchNotes} setEditNote={setEditNote} />
    </div>
  );
}

export default App;
