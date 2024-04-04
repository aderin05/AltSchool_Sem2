const http = require('http');
const fs = require('fs');
const path = require('path');
const pathToBooks  = path.join(__dirname, 'books.json');
const PORT = 2000;
const HOST_NAME = 'localhost';
const {authenticate} = require('./authenticate');

const server = http.createServer((req, res) => {
    if (req.url === '/books' && req.method === "GET") { 
        authenticate(req, res)
            .then(() => {
                getAllBooks(req, res)
            }).catch((error) => {
                res.writeHead(400);
                res.end(JSON.stringify({message : error}))
            })
    } else if (req.url === '/books' && req.method === "PUT") { // Update
        authenticate(req, res)
            .then(() => {
                updateBooks(req, res)
            }).catch((error) => {
                res.writeHead(400);
                res.end(JSON.stringify({message : err}))
            })
    } else if (req.url === '/books' && req.method === "DELETE") {
        authenticate(req, res)
            .then(() => {
                deleteBooks(req, res)
            }).catch((error) => {
                res.writeHead(400);
                res.end(JSON.stringify({message : err}))
            })
    } else if (req.url === '/books/author' && req.method === "GET"){
        authenticate(req, res)
            .then(() => {
                getAuthor(req, res)
            }).catch((error) => {
                res.writeHead(400);
                res.end(JSON.stringify({message : err}))
            })
    } else if (req.url === '/books/author' && req.method === "POST"){
        authenticate(req, res)
            .then(() => {
                addAuthor(req, res)
            }).catch((error) => {
                res.writeHead(400);
                res.end(JSON.stringify({message : err}))
            })
    } else if (req.url === '/books/author' && req.method === "PUT"){
        authenticate(req, res)
            .then(() => {
                updateAuthor(req, res)
            }).catch((error) => {
                res.writeHead(400);
                res.end(JSON.stringify({message : err}))
            })
    }
})

function getAllBooks(req, res){
    fs.readFile(pathToBooks, "utf8", (error, data) =>{
        if(error){
            console.log(error);
            res.writeHead(400);
            res.end("An error occurred");
        }
        res.end(data);
    })
 }

 function updateBooks(req, res){
    const body = []

    req.on("data", (chunk) => {
        body.push(chunk);
    })

    req.on("end", () => {
        const parsedBook = Buffer.concat(body).toString();
        const bookUpdate = JSON.parse(parsedBook);
        const bookId = bookUpdate.id
    
        fs.readFile(pathToBooks, "utf8", (error, books) =>{
            if(error){
                console.log(error);
                res.writeHead(400);
                res.end("An error occurred");
            }
            const booksObj = JSON.parse(books);

            const booksIndex = booksObj.findIndex(book => book.id === bookId)
        
            if(booksIndex === -1){
                res.writeHead(404);
                res.end("Book with specified id not found");
            }
            const updatedBook = { ...booksObj[booksIndex], ...bookUpdate};
            booksObj[booksIndex] = updatedBook;

            fs.writeFile(pathToBooks, JSON.stringify(booksObj), (error) => {
            if(error){
                console.log(error);
                res.writeHead(500);
                res.end("An error occurred");
            }
            res.writeHead(200);
            res.end("Update Successful");
            });
        })
    })

    
 }

 function deleteBooks(req, res){
    const body = []

    req.on("data", (chunk) => {
        body.push(chunk);
    })

    req.on("end", () => {
        const parsedBook = Buffer.concat(body).toString();
        const bookToDelete = JSON.parse(parsedBook);
        const bookId = bookToDelete.id
    
        fs.readFile(pathToBooks, "utf8", (error, books) =>{
            if(error){
                console.log(error);
                res.writeHead(400);
                res.end("An error occurred");
            }
            const booksObj = JSON.parse(books);

            const booksIndex = booksObj.findIndex(book => book.id === bookId)
        
            if(booksIndex === -1){
                res.writeHead(404);
                res.end("Book with specified id not found");
            }

            booksObj.splice(booksIndex, 1);
            

            fs.writeFile(pathToBooks, JSON.stringify(booksObj), (error) => {
            if(error){
                console.log(error);
                res.writeHead(500);
                res.end("An error occurred");
            }
            // res.writeHead(200);
            res.end("Book Deleted Successfully");
            });
        })
    })

 }

 function getAuthor(req, res){
    const body = []

    req.on("data", (chunk) => {
        body.push(chunk);
    })

    req.on("end", () => {
        const parsedBook = Buffer.concat(body).toString();
        const booksByAuthor = JSON.parse(parsedBook);
        const bookAuthor = booksByAuthor.author;

        fs.readFile(pathToBooks, "utf-8", (error, books) => {
            if(error){
                console.log(error);
                res.writeHead(400);
                res.end("An error occurred");
            }
            

            const booksObj = JSON.parse(books);
            var authorBooks = [];
            
            for(i = 0; i < booksObj.length; i++){
                var booksAuthor = booksObj[i].author;
                if(bookAuthor === booksAuthor){
                    authorBooks.push(booksObj[i]); 
                }                  
            } 
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(authorBooks));
            
        })
    })
    
 }

 function addAuthor(req, res){

 }

 function updateAuthor(req,res){
    
 }

server.listen(PORT, HOST_NAME, () => {
    console.log(`${HOST_NAME} is listening on port ${PORT}`)
})