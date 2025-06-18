// http practise 

// 1

// const express = require("express");
// const app = express();

// const PORT = 3000;

// function Sum(n){
//   let sum = 0;
//   for(let i=0;i<n;i++){
//     sum += i;
//   }
//   return sum;
// }
// app.get('/', (req,res) => {
//    const n = req.query.n;
//    const ans = Sum(n);
//    res.send("THE ANSWER IS " + ans);
// })

// app.listen(PORT, () => {
//   console.log(`server is running on PORT ${PORT}`);
// })


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