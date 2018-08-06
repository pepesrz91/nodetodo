const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client)=>{
  if (error) {
    return console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb Server");
  const db = client.db('TodoApp');
  db.collection('Users').insertOne({
    name:'Pepe',
    age:27,
    completed:false
  },(err,result)=>{
    if (error,result) {
      if(err){
          return console.log('Unable to insert todo', err);
      }
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });
  db.collection('Todos').insertOne({
    text:'Something to do',
    completed:false
  },(err,result)=>{
    if (error,result) {
      if(err){
          return console.log('Unable to insert todo', err);
      }
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });

  client.close();
});
