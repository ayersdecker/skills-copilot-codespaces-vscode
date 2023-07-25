// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');
// Create app
const app = express();
// Use body parser
app.use(bodyParser.json());
// Use cors
app.use(cors());
// Create comments
const commentsByPostId = {};
// Get all comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
// Create comments
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  // Get comments by post id
  const comments = commentsByPostId[req.params.id] || [];
  // Push comments
  comments.push({ id: commentId, content, status: 'pending' });
  // Set comments
  commentsByPostId[req.params.id] = comments;
  // Emit event
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });
  // Send response
  res.status(201).send(comments);
});
// Post event
app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);
  const { type, data } = req.body;
  // If type is CommentModerated
  if (type === 'CommentModerated') {
    // Get comments by post id
    const comments = commentsByPostId[data.postId];
    // Get comment by id
    const comment = comments.find((comment) => {
      return comment.id === data.id;
    });
    // Set status
    comment.status = data.status;
    // Emit event
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id: data.id,
        status: data.status,
        postId: data.postId,
        content: data.content,
      },
    });
  }
  // Send response
  res.send({});
});
// Listen on port
app.listen


