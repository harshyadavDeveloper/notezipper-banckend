const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async(req, res, next) =>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({ msg: 'Unauthorized HTTP or token is not provided'});
    }

    const jwtToken = token.replace('Bearer', '').trim("");
    console.log('token from middleware', jwtToken);
    try {

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({ email: isVerified.email }).select({password:0});
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userID = userData.id;

        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized. Invalid token or token is not provided'})
    }
  


}

module.exports = authMiddleware;