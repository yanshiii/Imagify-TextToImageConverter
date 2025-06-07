import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    console.log("Headers received by userAuth middleware:", req.headers);
    console.log("Authorization header:", req.headers['authorization']);
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id) {
            // req.body.userId = decoded.id;
            req.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default userAuth;
