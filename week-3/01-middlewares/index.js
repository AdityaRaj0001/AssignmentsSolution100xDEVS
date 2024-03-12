const express = require("express");
const zod = require("zod");
const app = express();
const port = 4000;
const schema = zod.array(zod.number());

app.use(express.json());

app.post("/health-checkup", function (req, res) {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    res.status(411).send(response.error.issues[0].message);
  } else {
    res.status(200).send(response.data);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//global catches
// app.use(function(err,req,res,next){
//     res.json({
//         msg:"Sorry something is up with our server"
//     })
// })
// let NR=0;
// let start;
// let end;
// const calculateReqs=(req,res,next)=>{
//     start = performance.now();
//     NR++;
//     console.log(NR)
//     next()
// }
// app.use(calculateReqs)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
//   end=performance.now()
//   console.log(end-start)
// })
