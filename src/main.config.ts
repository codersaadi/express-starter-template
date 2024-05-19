import { Server } from 'http';
import { CustomRouter, Endpoint } from './types/routes';

interface AppConfig {
  logging: {
    enabled: boolean;
    level: 'error' | 'warn' | 'info' | 'debug';
  };
  port?: number;
  dbUrl?: string;
  NODE_ENV?: string;
  SERVER_ERROR_MESSAGE?: string;
  GRACEFUL_SHUTDOWN?: {
    timeout: number;
    enabled: boolean;
  };
  logAppInfo?: () => void;
  registerEndpoints?: (customRouter: CustomRouter) => void;
  gracefulShutdown?: (server: Server) => void;
  endpoints?: Endpoint[];
}

const appConfig: AppConfig = {
  logging: {
    enabled: true,
    level: 'info',
  },
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  dbUrl: process.env.DB_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_ERROR_MESSAGE:
    process.env.SERVER_ERROR_MESSAGE || 'Something went wrong!',
  GRACEFUL_SHUTDOWN: {
    timeout: 10000, // 10 seconds default
    enabled: true,
  },
};
const logAppInfo = () => {
  console.log('Application Information:');
  console.table({
    'Logging Enabled': appConfig.logging.enabled,
    'Logging Level': appConfig.logging.level,
    Port: appConfig.port,
    'Database URL': appConfig.dbUrl,
    Environment: appConfig.NODE_ENV,
    'Server Error Message(default)': appConfig.SERVER_ERROR_MESSAGE,
    'Graceful Shutdown Enabled': appConfig.GRACEFUL_SHUTDOWN?.enabled,
    'Graceful Shutdown Timeout': appConfig.GRACEFUL_SHUTDOWN?.timeout,
  });
};

const gracefulShutdown = (server: Server) => {
  console.log('Received kill signal, shutting down gracefully...');
  server.close(() => {
    console.log('All connections closed. Server shut down gracefully.');
    process.exit(0);
  });

  // If the server takes too long to shut down, force exit
  setTimeout(() => {
    console.error(
      'Could not close connections in time. Forcefully shutting down...',
    );
    process.exit(1);
  }, appConfig.GRACEFUL_SHUTDOWN?.timeout);
};
const registerEndpoints = (router: CustomRouter) => {
  router.endpoints.forEach((endpoint) => {
    const { path, method, controller, middleware } = endpoint;
    router[method](path, ...(middleware || []), controller);
  });
};
appConfig.logAppInfo = logAppInfo;
appConfig.registerEndpoints = registerEndpoints;
appConfig.gracefulShutdown = gracefulShutdown;
export default appConfig;


