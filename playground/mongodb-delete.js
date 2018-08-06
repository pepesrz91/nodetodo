var {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (error, client)=>{
  if (error) {
    return console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb Server");
  const db = client.db('TodoApp');
  // const todos = db.collection('Todos');
  db.collection('Todos').deleteOne({name:"Pepe"}).then((result)=>{
    console.log(result);
  },(error)=>{
    console.log('No file exists',error);
  });
  //client.close();
});
