import express from 'express';
import Todo from './models/todo';
import User from './models/user';

export const addToDo = async function (req: express.Request, res: express.Response) {
    try {
        const { title, description, priority, dueDate, userEmail } = req.body;
        const createdDate = new Date();

        const todo = new Todo({
            title,
            description,
            priority,
            completed: false,
            dueDate,
            createdDate,
        });

        await todo.save();

        const findToDoId = await Todo.findOne({ _id: todo._id });
        const newToDoRef = { refId: findToDoId?._id };

        await User.findOneAndUpdate({ email: userEmail }, { $push: { todos: newToDoRef } });

        return res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Todo creation failed',
            error: error
        });
    }
}

export const getToDos = async function (req: express.Request, res: express.Response) {
    try {
        const todos = await User.findOne({ email: req.body.userEmail }).populate('todos.refId');
        return res.status(200).json({
            success: true,
            message: 'Todos fetched successfully',
            data: todos?.todos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Todos fetch failed',
            error: error
        });
    }
}

export const deleteToDo = async function (req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        await Todo.deleteOne({ _id: id });
        const todoRef = { refId: id };
        await User.findOneAndUpdate({ email: req.body.userEmail }, { $pull: { todos: todoRef } });
        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Todo deletion failed',
            error: error
        });
    }
}

export const updateToDo = async function (req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const { title, description, priority, completed, dueDate, userEmail } = req.body;
        await Todo.findOneAndUpdate({ _id: id }, { $set: { title, description, priority, completed, dueDate } });
        const todoRef = { refId: id };
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { todos: todoRef } });
        return res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Todo update failed',
            error: error
        });
    }
}