/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT=4000

app.use(express.json())

// app.get("/files/",async(req,res)=>{
//   try {
//     const files=await fs.readdir('./files/')
//     res.status(200).json({files})
    
//   } catch (error) {
//     res.status(500).json({error:"internal server error"})
//   }
// })

app.get("/files",(req,res)=>{
  fs.readdir('./files/',(err,data)=>{
    if(err)res.status(500).json({error:"some error occurred"})
    else {
      res.status(200).json({files:data})
    }
  })
})
app.get("/files/:filename",(req,res)=>{
  const filetoBeRead=req.params.filename
  fs.readFile(`./files/${filetoBeRead}`,'utf-8',(err,data)=>{
    if(err)res.status(404).json({error:"File not Found"})
    else {
      res.status(200).json({data:data})
    }
  })
})

app.get("*",(req,res)=>{
  res.status(404).json({msg:"Bad Gateway"})
})





app.listen(PORT,()=>{
  console.log(`app is running on port: ${PORT}`)
})

module.exports = app;