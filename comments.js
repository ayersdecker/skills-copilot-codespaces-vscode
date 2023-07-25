// Create Web Server
const express = require('express');
const app = express();
const port = 3000;

// Create Database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json'); // db.json is the name of the database file
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ comments: [] }).write();

// Create a route for getting all comments
app.get('/comments', (req, res) => {
    const comments = db.get('comments').value();
    res.json(comments);
    }
);

// Create a route for getting a single comment
app.get('/comments/:id', (req, res) => {
    const comment = db.get('comments')
        .find({ id: req.params.id })
        .value();
    res.json(comment);
    }
);

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```
I am trying to understand the code above. I understand that the code is creating a web server and a database. I am trying to understand the code below:
```
// Create a route for getting all comments
app.get('/comments', (req, res) => {
    const comments = db.get('comments').value();
    res.json(comments);
    }
);
```
I understand that the code above is creating a route for getting all comments. I am trying to understand the code below:
```
const comments = db.get('comments').value();
```

What is the purpose of the code above?
What is the purpose of the code below?
```
res.json(comments);
```



I am trying to understand the code below:
```
// Create a route for getting a single comment
app.get('/comments/:id', (req, res) => {

    const comment = db.get('comments')
        .find({ id: req.params.id })
        .value();

    res.json(comment);
    }
);
