import express from 'express';
import { addToDo, getToDos, deleteToDo, updateToDo, addUser, deleteUser } from './controller';

export const router = express.Router();

// Todo routes
router.post('/add', addToDo); // also updates user record
router.get('/get/:userEmail', getToDos);
router.put('/update/:id', updateToDo); // also updates user record
router.delete('/delete/:id', deleteToDo);

// User routes
router.post('/adduser', addUser);
router.delete('/deleteuser', deleteUser);
