const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    email: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    email: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    email: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

const userExists = (user, pass) => {
  return ALL_USERS.find((item) => item.email === user && item.password === pass);
};

app.post("/signin", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!userExists(email, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ email: email }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const {email} = jwt.verify(token, jwtPassword);

    res.json({
        users: ALL_USERS.filter((item)=>(item.email!==email))
    })
    // return a list of users other than this email
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, () => console.log("app listening to requests"));
