import express from 'express';
import { addToDo, getToDos, deleteToDo, updateToDo, addUser, deleteUser } from './controller';

export const router = express.Router();

router.get('/get/:userEmail', getToDos);
router.post('/add', addToDo);
router.delete('/delete/:id', deleteToDo);
router.put('/update/:id', updateToDo);
router.post('/adduser', addUser);
router.delete('/deleteuser', deleteUser);
