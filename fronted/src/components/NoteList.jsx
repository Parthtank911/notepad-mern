import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, fetchNotes, setEditNote }) => {
  return (
    <div>
      {notes.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No notes yet!</p>
      ) : (
        notes.map(note => (
          <NoteItem key={note._id} note={note} fetchNotes={fetchNotes} setEditNote={setEditNote} />
        ))
      )}
    </div>
  );
};

export default NoteList;
