var {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (error, client)=>{
  if (error) {
    return console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb Server");
  const db = client.db('TodoApp');
  db.collection('Users').find({name:'Pepe'}).count().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log('Unable to find todos'.err);
  });

  //client.close();
});
