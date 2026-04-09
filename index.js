const express = require("express");
const cors = require("cors");
const PostModel = require("./Models/PostModel");
const UserModel = require("./Models/UserModel");
require("./connection");  // MongoDB connect
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = express();
const port = 3210

app.use(cors());
app.use(express.json()); // parse JSON data

// POST /todo → Add task
app.post("/todo", async(req,res)=>{
    try {
        const task = new PostModel(req.body)
    
        await task.save();
        res.status(200).send("Data added successfully");
    } catch (err) {
        res.status(500).send("Data not added: " + err.message);
    }
});

// GET /getpost → Get all tasks
app.get("/getpost", async (req, res) => {
    const tasks = await PostModel.find();
    res.send(tasks);
});

// PUT /updatepost/:id → Update task
app.put("/updatepost/:id",async (req, res) => {
    try {
        await PostModel.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title, completed: req.body.completed } }
        );
        res.status(200).send("Data updated successfully");
    } catch {
        res.status(500).send("Data not updated successfully");
    }
});

// DELETE /delete/:id → Delete task
app.delete("/delete/:id",async (req, res) => {
    try {
        await PostModel.deleteOne({ _id: req.params.id});
        res.status(200).send("Deleted successfully");
    } catch {
        res.status(500).send("Not deleted successfully");
    }
});


app.listen(port, () => console.log(`Server running on port ${port}`));