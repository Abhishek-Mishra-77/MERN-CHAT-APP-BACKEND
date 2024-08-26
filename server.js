import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import database from "./config/database.js";

import chats from "./data/data.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/api/chats', (req, res) => {
    return res.send(chats);
})

app.use('/user', userRoutes)

database().
    then(() => {
        app.listen(5000, () => console.log("Server started on port 5000"));
        console.log("Database connected");
    })

