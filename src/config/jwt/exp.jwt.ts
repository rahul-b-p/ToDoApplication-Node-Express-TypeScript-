import jwt from 'jsonwebtoken';
import { loggers } from '../../utils/winston.util';
import { JwtPayload } from '../../types';



export const getJwtRemainsTime = (token: string):number|undefined => {
    try {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error('Access token secret is not defined');
        }
        const { exp } = jwt.verify(token, secretKey) as JwtPayload;
        const JwtremainsTime:number = exp - Math.floor(Date.now() / 1000);
        return JwtremainsTime;
    } catch (error) {
        loggers.info(error);
    }
}