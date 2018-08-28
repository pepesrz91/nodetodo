const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todos');

const todos = [{
  _id: new ObjectID,
  "text":"First test todo"
},{
  _id:new ObjectID,
  "text":"Second test todo"
}]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
});

describe('POST /todos',()=>{
  it('Should create a new todo',(done)=>{
    var text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,result)=>{
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });
  it("Should not create todo with invalid body data",(done)=>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if (err) {
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>done(e));
      })

  });
});

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    }).end(done)
  });
});

describe('GET /todos/:id',()=>{
  it('Should return a todo ID',(done)=>{
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(todos[todos[0]._id]);
      }).end(done);
  });

  it('Should return 404 if todo is not found',(done)=>{
    request(app)
      .get(`/todos/7b7488c4d0a8051314be3e34`)
      .expect(404)
      .expect((res)=>{
        expect(res.body._id == null);
      }).end(done);

  });

  it('Should return 404 if todo ID is wrong',(done)=>{
    request(app)
      .get(`/todos/345fg`)
      .expect(404)
      .expect((res)=>{
        expect(res.body._id == null);
      }).end(done);

  });

  // it('Should return 404 if for none object ID',(res)=>{
  //
  //
  // });
});

describe('DELETE /todos/:id',()=>{

  it('Should remove and object by id',(done)=>{

    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.id == hexId);
      }).end((err,res)=>{
        if (err) {
          return (err);
        }
        Todo.findById(hexId).then((todo)=>{
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should return 404 if todo is not found',(done)=>{
    request(app)
      .delete(`/todos/7b7488c4d0a8051314be3e34`)
      .expect(404)
      .expect((res)=>{
        expect(res.body._id == null);
      }).end(done);

  });

  it('Should return 404 if todo ID is wrong',(done)=>{
    request(app)
      .delete(`/todos/345fg`)
      .expect(404)
      .expect((res)=>{
        expect(res.body._id == null);
      }).end(done);

  });
});
