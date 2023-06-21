import { verifyToken } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";

export const authenticate = async (req, res, next) => {
    try {
        if (req.url !== '/api/user/login' && req.url !== '/api/user/register') {
            await verifyToken(req.headers?.authentication);
        }
        next();
    } catch (error) {
        res.status(401).json(new Response(10301, "Authentication !"));
    }
}