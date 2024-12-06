import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loggers } from "../utils/winston.util";
import { customRequest } from "../types";

function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
    return typeof payload !== 'string' && payload !== null;
}

export const authMiddleware = async (req: customRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const secretKey = process.env.ACCESS_TOKEN_SECRET;

        if (!secretKey) {
            res.status(500).json({ error: 'Secret key not configured' });
            return;
        }

        const jwtResponse = jwt.verify(accessToken, secretKey) as JwtPayload;

        if (isJwtPayload(jwtResponse) && jwtResponse.id) {
            req.payload = { id: jwtResponse.id };
            next();
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        loggers.error('Authentication error', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};