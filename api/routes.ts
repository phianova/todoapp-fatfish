import express from 'express';
import { addToDo, getToDos, deleteToDo, updateToDo } from './controller';

export const router = express.Router();

router.get('/get', getToDos);
router.post('/add', addToDo);
router.delete('/delete/:id', deleteToDo);
router.put('/update/:id', updateToDo);
