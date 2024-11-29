import jwt from 'jsonwebtoken';
import { loggers } from '../../utils/winston.util';

export const getAccessToken = (id: string): string => {
    const secretKey = process.env.ACCESS_TOKEN_SECERT;


    if (!secretKey) {
        throw new Error('Access token secret is not defined');
    }

    const accessToken = jwt.sign(
        { id },
        secretKey,
        { expiresIn: '1h' }
    )
    return accessToken;
};