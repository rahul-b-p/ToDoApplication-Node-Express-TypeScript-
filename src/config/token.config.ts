import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';
import redisClient from '../utils/redis.util';
import { loggers } from '../utils/winston.util';


export const blackListToken = async (token: string): Promise<string | null> => {
    try {
        const { exp } = jwt.decode(token) as JwtPayload;
        const expiresIn = exp - Math.floor(Date.now() / 1000);
        const result = await redisClient.set(token, 'Blacklisted', { 'EX': expiresIn });
        return result;
    } catch (error) {
        loggers.error(error);
        throw new Error("Can't Blacklist Token");
    }
}

export const checkTokenBlacklist = async (token: string):Promise<string|null> => {
    try {
        const result = await redisClient.get(token);
        return result;
    } catch (error) {
        loggers.error(error);
       throw new Error("Can't check the token now");
    }
}