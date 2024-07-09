import request from "supertest";
import app from "./index";
import mongoose from "mongoose";
import dotenv from "dotenv";

const email = Math.random().toString(36).substring(7) + "@example.com";

const user = {
    email: email,
    todos: [],
};

dotenv.config();

let id: string;

describe("API", () => {
    beforeEach(async () => {
        await mongoose.connect(process.env.MONGODB_URI as string)
    });

    afterEach(async () => {
        await mongoose.connection.close();
    });
    
    it("should create a user", done => {
        request(app)
            .post("/adduser")
            .send(user).then(res => {
                expect(res.body.success).toBe(true);
                done();
            })
    })

    it("should get todos", done => {
        request(app)
            .get(`/get/${email}`)
            .then(res => {
                expect(res.body.success).toBe(true);
                done();
            })
    })

    it("should add todo", done => {
        request(app)
            .post("/add")  
            .send({
                title: "test",
                description: "test",
                priority: 1,
                dueDate: new Date("2022-01-01"),
                userEmail: email
            }).then(res => {
                id = res.body.data._id
                expect(res.body.success).toBe(true);
                done();
            })
    })

    it("should update todo", async () => { 
        const res = await request(app)
            .put(`/update/${id}`)
            .send({
                title: "test",
                description: "change test",
                priority: 2,
                completed: false,
                dueDate: new Date("2022-01-01"),
                userEmail: email
            })
            .expect(200);
        expect(res.body.success).toBe(true);
    })

    it("should delete todo", async () => { 
        const res = await request(app)
            .delete(`/delete/${id}`)
            .send({
                userEmail: email
            })
            .expect(200);
        expect(res.body.success).toBe(true);
    })

    it("should delete user", async () => { 
        const res = await request(app)
            .delete(`/deleteuser`)
            .send({
                userEmail: email
            })
            .expect(200);
        expect(res.body.success).toBe(true);
    })
})