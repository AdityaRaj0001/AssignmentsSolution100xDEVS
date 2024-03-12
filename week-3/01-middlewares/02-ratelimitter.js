const express = require('express');
const app = express();
let numberOfRequestsForUser = {};

setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

app.use(function(req, res, next) {
    const userId = req.headers['user-id'];
    console.log(numberOfRequestsForUser)
    if (!userId) {
        return res.status(400).send("User ID is missing in the request header.");
    }

    if (!numberOfRequestsForUser[userId]) {
        numberOfRequestsForUser[userId] = 1;
    } else {
        numberOfRequestsForUser[userId]++;
    }

    if (numberOfRequestsForUser[userId] > 5) {
        return res.status(404).send("You have been blocked");
    }

    next();
});

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000);

module.exports = app;
