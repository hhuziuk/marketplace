export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    // if (!validateToken(token)) {
    //     return res.status(401).json({ message: "Unauthorized: Invalid token" });
    // }
    next();
};