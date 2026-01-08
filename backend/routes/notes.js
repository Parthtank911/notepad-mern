import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Create note
router.post("/", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err });
  }
});

// Get notes by user
router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err });
  }
});

// Update note
router.put("/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err });
  }
});

// Delete note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err });
  }
});

export default router;
