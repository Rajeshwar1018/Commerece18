const jwt = require('jsonwebtoken') 

const authMiddleware = (req, res, next) => {
    console.log('req.headers', req.headers)
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) {
        return res.status(400).json({
            message: 'Unauthorized: No token provided'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded", decoded)
        req.user = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = authMiddleware;