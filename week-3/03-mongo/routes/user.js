const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ msg: "User already exists" }); //return ke saath res.send() hai that's why aage nhi chalega code
    }

    // Create new user
    await User.create({ username, password });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const AllCourses = await Course.find({});

  res.json(AllCourses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    // Implement course purchase logic
    const courseId = req.params.courseId;

    // Find the user
    const foundUser = await User.findOne({
      username: req.headers.username,
      password: req.headers.password,
    });
    const foundCourse=await Course.findOne({
      _id:courseId
    })

    if(!foundCourse)return res.send({message:"No such course exist, sorry."})
    
      
    // Add the courseId to the purchasedCourses array
    foundUser.purchasedCourses.push(foundCourse);

    // Save the updated user object back to the database
    await foundUser.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    console.error("Error purchasing course:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const foundUser = await User.findOne({
    username: req.headers.username,
    password: req.headers.password,
  });

  const PurchasedCourses=await Course.find({
    _id:  {
      "$in":foundUser.purchasedCourses
    }
  })

  if(PurchasedCourses.length>0){
    return res.send({courses:PurchasedCourses})
  }
  else return res.send({message:"you haven't  purchased any course yet."})

});

module.exports = router;
