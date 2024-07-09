import express from 'express';
import { addTodo, getTodos, deleteTodo, updateTodo, addUser } from './controller';

export const router = express.Router();

router.get('/get/:userEmail', getTodos);
router.post('/add', addTodo);
router.delete('/delete/:id', deleteTodo);
router.put('/update/:id', updateTodo);
router.post('/adduser', addUser);
