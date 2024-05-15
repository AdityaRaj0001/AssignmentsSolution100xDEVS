const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course,User } = require("../db");
const {JWT_SECRET}=require("../config")
const jwt = require("jsonwebtoken");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username,
    password,
  });

  res.json({
    message: "Admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const admin = await Admin.findOne({
    username,
    password,
  });
  

  if (admin) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.status(200).json({
        message:token,
        
    })
  } else {
    res.status(411).json({
        message:"Incorrect email and password"
    })
  }

  
});

router.post("/courses", adminMiddleware, async(req, res) => {
  // Implement course creation logic
  
  const title=req.body.title
  const description=req.body.description
  const imageLink=req.body.imageLink
  const price=req.body.price

  const newCourse=await Course.create({
      title,
      description,
      imageLink,
      price
  })

  res.json({
      message:"Course created successfully",courseId:newCourse._id
  })
});

router.get("/courses", adminMiddleware, async(req, res) => {
  // Implement fetching all courses logic
  
  const AllCourses=await Course.find({})

  res.json({courses:AllCourses})


});

module.exports = router;
