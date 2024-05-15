// Middleware for handling auth
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require("../config")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization
    if(!token)return res.json({message:"send the goddamn token"
})

    const words=token.split(" ")
    const jwtToken=words[1]
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET)
    if(decodedValue.username)next();
    else res.status(403).json({
        msg:"you aren't authenticated"
    })
}

module.exports = adminMiddleware;