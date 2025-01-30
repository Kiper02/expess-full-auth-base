import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/global.js";
import { Redis } from 'ioredis';
import session from 'express-session';
import config from "./utils/config.js";
import { RedisStore } from 'connect-redis';
import router from './routes/index.router.js';
import 'dotenv/config';
import { conversionToBoolean } from "./utils/conversionToBoolean.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
const app = express();
const redis = new Redis(config.getOrThrow('REDIS_URI'));
const sessionMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах
redis.on('error', (err) => {
    console.error('Redis error:', err);
});
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: config.getOrThrow('SESSION_SECRET'),
    name: config.getOrThrow('SESSION_NAME'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        domain: config.getOrThrow('SESSION_DOMAIN'),
        maxAge: sessionMaxAge,
        httpOnly: conversionToBoolean(config.getOrThrow('SESSION_HTTP_ONLY')),
        secure: conversionToBoolean(config.getOrThrow('SESSION_SECURE')),
        sameSite: "lax"
    },
    store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow('SESSION_FOLDER')
    })
}));
app.use('/api', router);
app.use(errorMiddleware);
app.listen(process.env.APPLICATION_PORT, () => {
    console.log(`Server started on PORT = ${process.env.APPLICATION_PORT}`);
});
export default app;
//# sourceMappingURL=app.js.map