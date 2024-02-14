const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

let friends = require('./app/data/friends.json');

app.use(express.static("./app/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/public/index.html'))
});

app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/public/survey.html'))
});

app.post('/survey', (req, res) => {
    let newUser = {
        "name": req.body.userName,
        "photo":  req.body.userPic,
        "scores": [
            Number(req.body.Q1),
            Number(req.body.Q2),
            Number(req.body.Q3),
            Number(req.body.Q4),
            Number(req.body.Q5),
            Number(req.body.Q6),
            Number(req.body.Q7),
            Number(req.body.Q8),
            Number(req.body.Q9),
            Number(req.body.Q10),
        ]
    }
    friends.push(newUser);
    fs.writeFileSync('app/data/friends.json', JSON.stringify(friends, null, 4),  'UTF-8');
    res.sendFile(path.join(__dirname, 'app/public/survey.html'))
});

app.get('/api/friends', (req, res) => {
    res.json(friends)
});

app.listen(3000, () => {
    console.log(`Express app running on http://localhost:${PORT}`);
});