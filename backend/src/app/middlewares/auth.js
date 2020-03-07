import authConfig from "../../config/auth";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
        jwt.verify(token, authConfig.secret, (err, result) => {
            req.userId = result.id;
        });

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export default auth;
