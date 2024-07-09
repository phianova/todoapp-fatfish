import express from 'express';
import Todo from './models/todo';
import User from './models/user';

export const addTodo = async function (req: express.Request, res: express.Response) {
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

        const findTodoId = await Todo.findOne({ _id: todo._id });
        const newTodoRef = { refId: findTodoId?._id };

        await User.findOneAndUpdate({ email: userEmail }, { $push: { todos: newTodoRef } });

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

export const getTodos = async function (req: express.Request, res: express.Response) {
    try {
        const user = await User.findOne({ email: req.params.userEmail }).populate('todos.refId');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const todos = user?.todos.map((todo) => {
            return todo.refId;
        });
        return res.status(200).json({
            success: true,
            message: 'Todos fetched successfully',
            data: todos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Todos fetch failed',
            error: error
        });
    }
}

export const deleteTodo = async function (req: express.Request, res: express.Response) {
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

export const updateTodo = async function (req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const { title, description, priority, completed, dueDate } = req.body;
        await Todo.findOneAndUpdate({ _id: id }, { $set: { title, description, priority, completed, dueDate } });
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

export const addUser = async function (req: express.Request, res: express.Response) {
    try {
        const { email } = req.body;
        console.log("email in API controller", email);
        const user = new User({
            email,
            todos: [],
        });
        console.log("user in API controller", user);
        await user.save().catch((err) => {
            console.log(err);
        })

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User creation failed',
            error: error
        });
    }
}