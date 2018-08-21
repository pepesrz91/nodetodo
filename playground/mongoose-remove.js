
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');


// Todo.remove

todo.remove({}).then((result)=>{
  console.log(result);
})
