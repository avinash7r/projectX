import jwt from 'jsonwebtoken';

export const authenticationMiddleware = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "token not found" });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.payload;
        // res.json(req.user);
        next();
    } catch (error) {
        return res.status(401).json({error: error.message, message: "Unauthorized token found" ,token});
    }
};
