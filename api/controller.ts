import express from 'express';
import Todo from './models/todo';
import User from './models/user';

export const addToDo = async function (req: express.Request, res: express.Response) {
    try {
        // Read in todo data and user email from request body
        const { title, description, priority, dueDate, userEmail } = req.body;

        // Add todo with createdDate=today, completed=false as defaults for new Todos
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

        // Add Todo to user record
        const findToDoId = await Todo.findOne({ _id: todo._id });
        const newToDoRef = { refId: findToDoId?._id };
        await User.findOneAndUpdate({ email: userEmail }, { $push: { todos: newToDoRef } });

        // Return response
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
        // Find user by email and populate todos by refId
        const user = await User.findOne({ email: req.params.userEmail }).populate('todos.refId');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Access todo object for each refId to create array of todo items
        const todos = user?.todos.map((todo) => {
            return todo.refId;
        });

        // Return response
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

export const deleteToDo = async function (req: express.Request, res: express.Response) {
    try {
        // Delete todo by id
        const id = req.params.id;
        await Todo.deleteOne({ _id: id });

        // Remove todo from user record
        const todoRef = { refId: id };
        await User.findOneAndUpdate({ email: req.body.userEmail }, { $pull: { todos: todoRef } });

        // Return response
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
        // Read in todo data from request body and id from params
        const id = req.params.id;
        const { title, description, priority, completed, dueDate } = req.body;
        // Update todo
        await Todo.findOneAndUpdate({ _id: id }, { $set: { title, description, priority, completed, dueDate } });
        // Return response
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
        // Read in user email from request body
        const { email } = req.body;

        // Create new user object with empty todo array
        const user = new User({
            email,
            todos: [],
        });

        // Check user not already in DB
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Add user to DB
        await user.save().catch((err) => {
            console.log(err);
        })

        // Return response
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

// Delete user - currently used only in testing
export const deleteUser = async function (req: express.Request, res: express.Response) {
    try {
        // Read in user email from request body
        const { email } = req.body;

        // Delete user from DB
        await User.deleteOne({ email });

        // Return response
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User deletion failed',
            error: error
        });
    }
}