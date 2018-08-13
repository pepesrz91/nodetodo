
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

var id = '5b71bddbe6b2e54d506592bf'
var userID = "5b69dcb592574c40145e4dd2"

if (!ObjectID.isValid(id)) {
  console.log("Incorrect ID");
}

if (!ObjectID.isValid(userID)) {
  console.log("Invalid user ID");
}

// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos:',todos);
// });
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('Todo:',todo);
// })

Todo.findById(id).then((todo)=>{
  console.log('Todo by ID: ',id);
},(e)=>console.log(e));

User.findById(userID).then((user)=>{
  if (!user) {
    console.log("Unable to find user");
  }else{
    console.log('User by ID:', user);
  }

},(e)=>{
  console.log(e);
});
