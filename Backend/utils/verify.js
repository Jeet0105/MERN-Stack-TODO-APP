import jwt from "jsonwebtoken"

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default verifyUser