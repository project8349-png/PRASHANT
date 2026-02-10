const Note = require('../models/Note');

exports.addNote = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;

    const note = new Note({
      userId: req.userId,
      title,
      content,
      isPublic
    });

    await note.save();
    res.status(201).json({ message: 'Note created', note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPublicNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isPublic: true })
      .populate('userId', 'username profilePic')
      .sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, isPublic },
      { new: true }
    );

    res.json({ message: 'Note updated', note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
