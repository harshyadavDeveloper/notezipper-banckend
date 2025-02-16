const Notes = require("../models/notesModel");

const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await Notes.find({ user: userId });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createNotes = async (req, res) => {
  try {
    const { category, title, content } = req.body;
    console.log("request user: " + req.user);
    const userId = req.user._id;

    if (!category || !title || !content) {
      res.status(400).json({ message: "Please fill all the fields." });
      return;
    }
    const newNote = new Notes({
      user: userId,
      category,
      title,
      content,
    });

    const createdNote = await newNote.save();
    res.status(201).json(createdNote);
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    // Find and delete the note, ensuring it belongs to the current user
    const deletedNote = await Notes.findOneAndDelete({ 
      _id: noteId,
      user: userId 
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    const { category, title, content } = req.body;

    // Check if all required fields are present
    if (!category || !title || !content) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Find the note and update it, ensuring it belongs to the current user
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: noteId, user: userId }, 
      { category, title, content },
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getNotes, createNotes, deleteNote, updateNote };
