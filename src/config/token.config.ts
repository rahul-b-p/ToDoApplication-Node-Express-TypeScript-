import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';
import redisClient from '../utils/redis.util';
import { loggers } from '../utils/winston.util';


export const blackListToken = async(token: string) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {exp} = jwt.decode(token) as JwtPayload;
            const expiresIn = exp - Math.floor(Date.now()/1000);
            const result = await redisClient.set(token, 'Blacklisted',{'EX':expiresIn});
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export const checkTokenBlacklist=async(token:string)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const result = await redisClient.get(token);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}