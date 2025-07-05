import jwt from 'jsonwebtoken'

export const AuthMiddleware = async(req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided.' });
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
}

export const AdminMiddleware = async(req,res,next) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({ message: 'Access Denied: Admins only.' });
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong in Admin check.' });
    }
}