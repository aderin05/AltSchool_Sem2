const express = require('express');
const router = express.Router();

router.get("/", (req,res) => {
    res.json({"author" : "Chinua Achebe", "title" : "Things Fall Apart"})
})

router.post("/", (req, res) => {
    res.json({message : "Author created"})
})

router.put("/:authorId", (req,res) => {
    res.json({message : "Author Updated"})
})

router.delete("/:authorId", (req,res) => {
   res.json({message : "Author Deleted"})
})

module.exports = router;