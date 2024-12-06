import jwt from 'jsonwebtoken';
import { loggers } from '../../utils/winston.util';

export const getAccessToken = (id: string): string => {
    const secretKey = process.env.ACCESS_TOKEN_SECRET;




    if (!secretKey) {


        throw new Error('Access token secret is not defined');
    }

    const accessToken = jwt.sign(
        { id },
        secretKey,
        { expiresIn: '7h' }
    )
    return accessToken;
};