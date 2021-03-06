var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos.js');
var {Users} = require('./models/users.js');





var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos',(req,res)=>{

  Todo.find().then((todos)=>{
    res.send({todos})
  },(err)=>{
    res.status(400).send(e)
  })
  // res.send('<h1>Hello World</h1>');
});

//GET /todo/id
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo}).status(200);
  }).catch((e)=>{
    res.status(400).send();
  });
  // res.send(req.params);

});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if (!todo) {
      res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(port,()=>{
  console.log(`Started in port ${port}`);
});



module.exports = {app}
