import express from "express";
import cors from "cors";
import chats from "./data/data.js";



const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/chats', (req, res) => {
    return res.send(chats);
})

app.listen(5000, () => console.log("Server started on port 5000"));
