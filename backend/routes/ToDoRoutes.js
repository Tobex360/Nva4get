const express = require('express');
const {createToDo, getAllToDo, deleteToDo, updateToDo} = require('../controllers/ToDoController');
const router = express.Router();

router.post('/create-to-do',createToDo);
router.get('/get-all-to-do/:userId',getAllToDo);
router.delete('/delete-to-do/:id',deleteToDo);
router.patch('/update-to-do/:id',updateToDo);

module.exports = router;