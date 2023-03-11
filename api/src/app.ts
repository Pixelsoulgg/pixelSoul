// src/app.ts
import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./route/routes";
import * as swaggerJson from "./swagger/swagger.json";
import * as swaggerUI from "swagger-ui-express";
import errorMiddleware from "./middlewares/error.middleware";
import { rateLimiterMiddleware } from "./middlewares/rate-limiter-middleware";
export const app = express();
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
RegisterRoutes(app);
app.use(["/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(rateLimiterMiddleware);
app.use(errorMiddleware);


