const express = require("express");
const router = express.Router();

const firestore = require("firebase/firestore");
const db = firestore.getFirestore();

router.get("/:id", (req, res) => {
    const postId = req.params.id;
    const postQuery = firestore.getDoc(firestore.doc(db, "posts", postId));

    postQuery
        .then((response) => {
            res.send(response.data());
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;