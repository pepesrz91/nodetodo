var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos.js');
var {Users} = require('./models/users.js');


var app = express();
app.use(bodyParser.json());

// POST /todos for resource creation
app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text: req.body.text
  });

todo.save().then((doc)=>{
  res.send(doc);
},(error)=>{
  res.status(400).send(error);
  });
});

app.listen(3000,()=>{
  console.log('Started on port 3000');
});
