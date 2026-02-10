const express = require('express');
const auth = require('../middleware/auth');
const { addNote, getPublicNotes, getMyNotes, updateNote, deleteNote } = require('../controllers/noteController');

const router = express.Router();

router.post('/add', auth, addNote);
router.get('/public', getPublicNotes);
router.get('/my-notes', auth, getMyNotes);
router.put('/update/:id', auth, updateNote);
router.delete('/delete/:id', auth, deleteNote);

module.exports = router;
