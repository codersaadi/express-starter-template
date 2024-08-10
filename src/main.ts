import * as morgan from 'morgan';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as http from 'http';
import { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import sampleRoute from '@/routes/sampleRoute';
import { logger } from '@/utils/logger';
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
app.use("/", sampleRoute);

// logger 
// // Error handling middleware
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     logger.error(err.message);
//   res.status(500).send('Something went wrong!');
// });

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
})
