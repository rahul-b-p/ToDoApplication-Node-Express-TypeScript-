import {createClient} from '@redis/client';
import { loggers } from './winston.util';

const redisClient = createClient();

redisClient.on('connect',()=>{
    loggers.info('Connected to Redis');
});

redisClient.on('error',(error)=>{
    loggers.error({message:'Redis Error',error});
});

(async()=>{
    try {
        await redisClient.connect();
    } catch (error) {
        loggers.error(`Reddis Connection Failed:${error}`);
    }
})();

export default redisClient;