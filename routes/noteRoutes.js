const express = require('express');
const authMiddleware = require('../middlewares/auth-middlewares');
const notesController = require('../controllers/notesController');
const router = express.Router();

router.route('/').get(authMiddleware,notesController.getNotes);
router.route('/create').post(authMiddleware, notesController.createNotes);
router.route('/delete/:id').delete(authMiddleware, notesController.deleteNote);
router.route("/update/:id").put(authMiddleware, notesController.updateNote);

module.exports = router;