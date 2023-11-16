const express = require("express");
const app = express();
const firebase = require("firebase/app");

const port = 4000;

// web app's Firebase configuration -- make sure this is above the indexRoute
const firebaseConfig = {
    apiKey: "AIzaSyBkdgzUgpq-T_-ODdz33GwVPUSTwyUJvR0",
    authDomain: "dynamic-web-exercise-fiv-c492d.firebaseapp.com",
    projectId: "dynamic-web-exercise-fiv-c492d",
    storageBucket: "dynamic-web-exercise-fiv-c492d.appspot.com",
    messagingSenderId: "25901111321",
    appId: "1:25901111321:web:867de02707e5bf72a8b288"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

const indexRoute = require('./routes/index');
const singlePostRoute = require('./routes/singlePost');
const createPostRoute = require('./routes/createPost');
  
app.use("/", indexRoute);
app.use("/post", singlePostRoute);
app.use("/create", createPostRoute);

app.listen(port, () => {
    console.log(`Exercise Five listening on port ${port}`);
});