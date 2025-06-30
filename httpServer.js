// http practise 

// 1

const express = require("express");
const app = express();

const PORT = 3000;

function Sum(n){
  let sum = 0;
  for(let i=0;i<n;i++){
    sum += i;
  }
  return sum;
}
app.get('/', (req,res) => {
   const n = req.query.n;
   const ans = Sum(n);
   res.send("THE ANSWER IS " + ans);
})

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
})


// 2

const express = require("express");
const app = express();

app.use(express.json());
const users = [{
  name : "harkirat",
  kidneys : [{
    healthy : false
  }]
}];

app.get('/', function(req,res){
   const usersKidney = users[0].kidneys;
   const noOfKidneys = usersKidney.length;
   let numberOfHealthyKidneys = 0;
   for(let i=0;i<noOfKidneys;i++){
    if(usersKidney[i].healthy){
      numberOfHealthyKidneys += 1;
    }
   }
   const numberOfUnhealthyKidneys = noOfKidneys - numberOfHealthyKidneys;
   res.json({
    usersKidney,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys
   })
});


app.post("/",function(req,res){
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy : isHealthy
  })
  res.json({
    msg:"Done"
  })
});

// updating all unhealthy kidney to healthy kidney
app.put("/",function(req,res){
   for(let i=0;i<users[0].kidneys.length;i++){
     users[0].kidneys[i].healthy = true;
   }
   res.json({});
});

// removing all unhealthy kidneys
app.delete("/",function(req,res){
  let newKidneys = [];
  for(let i=0;i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy){
      newKidneys.push({
        healthy : true
      })
    }
    users[0].kidneys = newKidneys;
    res.json({
      msg : "Done"
    })
  }
});


app.listen(3000);

// 3

const express = require("express");
const app = express();

app.get('/sum',function(req,res){
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    "ans" : a + b
  }); 
})

app.get('/multiply',function(req,res){
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    "ans" : a * b
  }); 
})

app.get('/subtract',function(req,res){
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    "ans" : a - b
  }); 
})

app.get('/divide',function(req,res){
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    "ans" : a / b
  }); 
})

app.listen(3000);


//  react code

import { useState } from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      description: "Hit the gym regularly",
      done: true,
    },
  ]);

  function addTodo() {
    let newArray = [];
    for (let i = 0; i < todos.length; i++) {
      newArray.push(todos[i]);
    }
    newArray.push({
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      done: true,
    });
    setTodos(newArray);
  }

  return (
    <div>
      <input id="title" type="text" placeholder="Title"></input>
      <input id="description" type="text" placeholder="Deescription"></input>
      <br />
      <button onClick={addTodo}>Add todo</button>
      <br />
      {todos.map((todo) => (
        <Todo
          title={todo.title}
          description={todo.description}
          done={todo.done}
        />
      ))}
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h1>{props.done ? "Task is done" : "Task is not done"}</h1>
    </div>
  );
}
