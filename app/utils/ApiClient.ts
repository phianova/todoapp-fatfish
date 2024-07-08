import axios from 'axios';
import { TodoItem } from '../types';

const url = "https://4wgjp9tm5d.execute-api.eu-west-1.amazonaws.com/dev"

export default class ApiClient {
    async getTodos(userEmail: string) {
        return await axios.get<{data: TodoItem[]}>
        (`${url}/get/${userEmail}`)
        .then(response => {
            return response.data.data;
        }).catch((err) => {
            return err.response.data;
        });
    }

    async addTodo(title: string, description: string, priority: number, dueDate: Date, userEmail: string) {
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

    async updateTodo(id: string, title: string, description: string, priority: number, dueDate: Date, completed: boolean, userEmail: string) {
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
            console.log(res.data);
            return res.data;
        }).catch((err) => {
            console.log(err.response.data);
            return err.response.data;
        });
    }

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
        console.log(userEmail);
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