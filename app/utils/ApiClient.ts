import axios from 'axios';
import { TodoItem } from './types';

// URL for Serverless API deployment
// Can replace if running backend locally
const url = "https://4wgjp9tm5d.execute-api.eu-west-1.amazonaws.com/dev"

export default class ApiClient {
    // Calls getTodos in the API
    async getTodos(userEmail: string) {
        return await axios.get<{data: TodoItem[]}>
        (`${url}/get/${userEmail}`)
        .then(response => {
            return response.data.data;
        }).catch((err) => {
            return err.response.data;
        });
    }

    // Calls addTodo in the API
    async addTodo(title: string, description: string, priority: number, dueDate: string, userEmail: string) {
        return await axios({
            method: 'POST',
            url: `${url}/add`,
            data: {
                title: title,
                description: description,
                priority: priority,
                dueDate: dueDate,
                userEmail: userEmail
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err.response.data;
        });
    }

    // Calls updateTodo in the API
    async updateTodo(id: string, title: string, description: string, priority: number, dueDate: string, completed: boolean, userEmail: string) {
        return await axios({
            method: 'PUT',
            url: `${url}/update/${id}`,
            data: {
                title: title,
                description: description,
                priority: priority,
                dueDate: dueDate,
                completed: completed,
                userEmail: userEmail
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err.response.data;
        });
    }

    // Calls deleteTodo in the API
    async deleteTodo(id: string, userEmail: string) {
        return await axios({
            method: 'DELETE',
            url: `${url}/delete/${id}`,
            data: {
                userEmail: userEmail
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err.response.data;
        });
    }

    async addUser(userEmail: string) {
        return await axios({
            method: 'POST',
            url: `${url}/adduser`,
            data: {
                email: userEmail
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err.response.data;
        });
    }

}