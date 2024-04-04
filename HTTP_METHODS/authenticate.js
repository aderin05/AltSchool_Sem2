const { error } = require("console");
const fs = require("fs");
const path = require("path");
const pathToUsers = path.join(__dirname, 'users.json');
function getAllUsers(req, res){
    return new Promise((resolve, reject) => {
      fs.readFile(pathToUsers, "utf-8", (error, users) => {
        if(error){
            reject(error);
        }
        resolve(JSON.parse(users))
      })
    })
}
function authenticate(req, res){
    return new Promise((resolve, reject) => {
         const body = [];
         req.on("data", (chunk) => {
            body.push(chunk)
         })
         req.on("end", async () => {
            const userDetails = Buffer.concat(body).toString()
            if(!userDetails){
                reject("Enter your Username or Email and password")
            }
            const parsedUserDetails = JSON.parse(userDetails);
            const users = await getAllUsers();
            const findUser = users.find((user) => {
                return user.username === parsedUserDetails.username
            })
            if(!findUser){
            reject("Username does not exist")
            }

            if(findUser.password !== parsedUserDetails.password){
                 reject("Incorrect password")
            }
            resolve("Login Successful")
         })
    })
}

module.exports = {
    authenticate
}