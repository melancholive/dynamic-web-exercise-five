const express = require("express");
const router = express.Router();

// intialize firebase database
const firestore = require("firebase/firestore");
// create a reference to the database
const db = firestore.getFirestore();

// define index route -- get all posts
router.get("/", (req, res) => {
    const postsQuery = firestore.getDocs(firestore.collection(db, "posts"));
    const postsArray = [];

    postsQuery
        .then((response) => {
            response.forEach((post) => {
                console.log(post.data());
                // ... is a spread operator, assigns the value throughout rather than creating individual objects for each key value pair
                postsArray.push({id: post.id, ...post.data()}); 
            });
            res.send(postsArray);
        }) // do not put semi colon -- they are connected
        .catch((error) => {
            console.log(error);
            return res.send(error);
        });
});

const singlePostRoute = require('./singlePost');
router.use("/post", singlePostRoute);
const createPostRoute = require('./createPost');
router.use("/create", createPostRoute);

module.exports = router;