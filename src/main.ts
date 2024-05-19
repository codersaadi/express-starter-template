import * as morgan from 'morgan';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as http from 'http';
import { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import sampleRoute from '@/routes/sampleRoute';
import { logger } from '@/utils/logger';
import appConfig from '@/main.config';
dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(sampleRoute.rootPath, sampleRoute);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (appConfig.logging.enabled) {
    logger.error(err.message);
  }
  res.status(500).send(appConfig.SERVER_ERROR_MESSAGE);
});

app.listen(appConfig.port);

if (appConfig.GRACEFUL_SHUTDOWN.enabled) {
  process.on('SIGINT', () => appConfig.gracefulShutdown(server));
  process.on('SIGTERM', () => appConfig.gracefulShutdown(server));
}
appConfig.logAppInfo();
