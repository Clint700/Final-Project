const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {

    const doesExist = (username)=>{
        let userswithsamename = users.filter((user)=>{
          return user.username === username
        });
        if(userswithsamename.length > 0){
          return true;
        } else {
          return false;
        }
      }

    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
      } else {
        return res.status(400).json({ message: "User already exists!" });
      }
    } else {
      return res.status(400).json({ message: "Unable to register user. Username or password missing." });
    }
  });
  

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
  
    // Create a promise (optional)
    let myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise resolved");
      }, 6000);
    });
  
    // Console log before calling the promise
    console.log("Before calling promise");
  
    // Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
      console.log("From Callback: " + successMessage);
    });
  
    // Console log after calling the promise
    console.log("After calling promise");
  });
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);

  // Create a promise (optional)
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved");
    }, 6000);
  });

  // Console log before calling the promise
  console.log("Before calling promise");

  // Call the promise and wait for it to be resolved and then print a message.
  myPromise.then((successMessage) => {
    console.log("From Callback: " + successMessage);
  });

  // Console log after calling the promise
  console.log("After calling promise");
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const filteredBooks = Object.values(books).filter(book => book.author === author);
    res.send(filteredBooks);
  
    // Create a promise (optional)
    let myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise resolved");
      }, 6000);
    });
  
    // Console log before calling the promise
    console.log("Before calling promise");
  
    // Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
      console.log("From Callback: " + successMessage);
    });
  
    // Console log after calling the promise
    console.log("After calling promise");
  });
  

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const filteredBooks = Object.values(books).filter(book => book.title === title);
    res.send(filteredBooks);
  
    // Create a promise (optional)
    let myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise resolved");
      }, 6000);
    });
  
    // Console log before calling the promise
    console.log("Before calling promise");
  
    // Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
      console.log("From Callback: " + successMessage);
    });
  
    // Console log after calling the promise
    console.log("After calling promise");
  });
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.isbn;
  res.send(Object.values(books).filter(book => book.reviews === review));
});

module.exports.general = public_users;
