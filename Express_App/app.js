const express = require('express');
const app = express();
const authorRoutes = require("./author_routers");
const logger = require("./logger")

app.use(express.json())
app.use(logger)
app.use("/authors", authorRoutes)

app.get("/", (req, res) => {
    res.send("Hello");
})
app.all("*", (req,res) => {
    res.status(404).jsonp({message: "Page not found"})
})
app.listen(4000, () => {
    console.log("Server is running on port 4000");
})