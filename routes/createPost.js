const express = require("express");
const router = express.Router();

// intialize firebase database
const firestore = require("firebase/firestore");
// create a reference to the database
const db = firestore.getFirestore();

const submitForm = `
    <form action="/create/submit">
        <label>Author
            <input type="text" name="author" />
        </label>
        <label>Text
            <input type="text" name="postText" />
        </label>
        <label>Title
            <input type="text" name="postTitle" />
        </label>
        <button type="submit">Submit</button>
    </form>
`;

router.get("/", (req, res) => {
    res.send(submitForm);
});

router.get("/submit", (req,res) => {
    const queryParams = req.query; // query params from URL
    
    const author = queryParams.author;
    const text = queryParams.postText;
    const title = queryParams.postTitle;

    // create dynamic ID
    const id = title.replace(/\s+/g, "-").toLowerCase();
    // submit post to firebase
    const setBlogPost = firestore.setDoc(firestore.doc(db, "posts", id),{
        author: author,
        postText: text,
        postTitle: title,
    });
    
    setBlogPost
        .then(() => {
            res.send(`
                <h1>thanks</h1>
                <p><a href="/create">Submit another post</a>.</p>
            `);
        })
        .catch((error) => {
            console.warn(error);
            res.send(`Error Submitting: ${error.toString()}`);
        })
});

module.exports = router;