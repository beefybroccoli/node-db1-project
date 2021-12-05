const express = require("express");
const routerAccounts = require("./accounts/accounts-router");

const server = express();

server.use(express.json());
server.use(express.Router());


server.get("/", (req, res)=>{
    res.status(200).json({message: "hello world"});
})

server.use("/api/accounts", routerAccounts);

server.get("*", (req, res)=>{
    res.status(500).json({message:`'${req.path}' path not found`});
})

module.exports = server;
