var {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (error, client)=>{
  if (error) {
    return console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb Server");

  const db = client.db('TodoApp');

  db.collection('Todos').findOneAndUpdate({
    _id:new ObjectID('5b68956c76996826f8e68d0c')
  },{
      $set:{
        completed:true
      }
    },{
      returnOriginal:false
    }).then((result)=>{
      console.log(result);
    });
    db.collection('Users').findOneAndUpdate({
      _id:new ObjectID('5b68956c76996826f8e68d0b')
    },{
        $set:{
          name:"Poncho"
        },
        $inc:{
          age:2
        }
      },{
        returnOriginal:false
      }).then((result)=>{
        console.log(result);
      });
  //client.close();
});
