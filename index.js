/*
    Server entrance
*/

require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const server = express();
const db = require("./Db/db");
const cors = require('cors');
const { response } = require('express');
const path = require("path");
const PORT = process.env.PORT || 5000;


server.use(cors());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname,"client/build")))

if(process.env.NODE_ENV === "production"){
    server.use(express.static(path.join(__dirname,"client/build")))
}


/* For debugging */
server.get("/",(req,res)=>{
    res.json({info: "Server is connected and running"})
})

//////////////// NOTES ///////////////////

/* For Fetching notes */
server.get("/note",(req,res)=>{

    if(req.query.type==="colab"){
        db.showNotesColab(req.query,res)
    }

    else if(req.query.type==="read"){
        db.showNotesRead(req.query,res);
    }
   
    else{
    db.showNotes(req.query,res);
    }
})

/* For posting notes */
server.post("/note",(req,res)=>{
    db.addNote(req.body,res);
})

/* For deleting notes */
server.delete("/note",(req,res)=>{
    db.deleteNote(req.query,res);
})

/* For updating notes */
server.put("/note",(req,res)=>{
    db.updateNote(req.body,res);
})

/* For sharing  notes */
server.post("/share",(req,res)=>{
    if(req.body.type === "colab"){
        db.shareColab(req.body,res);
    }

    else if(req.body.type ==="read"){
        db.shareRead(req.body,res);
    }
})

//////////////// USERS ///////////////////

/* For Authentication */
server.post("/auth",(req,res)=>{
    
    if(req.body.type==="login"){
        db.checkUser(req.body,res);
    }

    if(req.body.type==="signup"){
      
        db.createUser(req.body,res);
    }

})

server.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

server.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`)
})