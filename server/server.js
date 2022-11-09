const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["userone", "usertwo", "userthree", "steylor"]})
})

app.listen(5000, () => { console.log("Server /Started at Port 5000")})