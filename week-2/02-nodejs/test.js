const express = require("express");
const app = express();
const port = 4000;
const users = [
  {
    name: "john",
    kidneys: [
      {
        isHealthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  const numberofKidneys = johnKidneys.length;
  let numberofHealthyKidneys = 0;
  johnKidneys.forEach((obj) => {
    if (obj.isHealthy) numberofHealthyKidneys++;
  });
  let numberofunHealthyKidneys = numberofKidneys - numberofHealthyKidneys;
  res.json({
    numberofKidneys,
    numberofHealthyKidneys,
    numberofunHealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    isHealthy: isHealthy,
  });

  res.json({
    ...users,
  });
});

app.put("/", (req, res) => {
  users[0].kidneys.forEach((obj) => {
    obj.isHealthy = true;
  });
  res.json({ ...users });
});
app.delete("/", (req, res) => {
  const n=req.query.n
  users[0].kidneys.splice(n-1,1)
  res.json({ ...users });
});

app.listen(port, () => {
  console.log(users[0].kidneys);
});
