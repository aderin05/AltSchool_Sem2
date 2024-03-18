const http = require("http");

const server = http.createServer((req, res) =>{
    res.end("Fisher Aderinola");
});

server.listen(8900, "localhost", () => {
    console.log("My name is Fisher Aderinola and I am on port 8900");
})
