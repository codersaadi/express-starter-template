import { Server } from 'http';
import { CustomRouter } from '@/types/routes';

/**
 * AppConfig interface defines the structure of the application configuration object.
 */
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
}

// Default configuration values
const defaultConfig: AppConfig = {
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

/**
 * logAppInfo logs application information to the console.
 */
const logAppInfo = () => {
  console.log('Application Information:');
  console.table({
    'Logging Enabled': defaultConfig.logging.enabled,
    'Logging Level': defaultConfig.logging.level,
    Port: defaultConfig.port,
    'Database URL': defaultConfig.dbUrl,
    Environment: defaultConfig.NODE_ENV,
    'Server Error Message(default)': defaultConfig.SERVER_ERROR_MESSAGE,
    'Graceful Shutdown Enabled': defaultConfig.GRACEFUL_SHUTDOWN?.enabled,
    'Graceful Shutdown Timeout': defaultConfig.GRACEFUL_SHUTDOWN?.timeout,
  });
};

/**
 * gracefulShutdown gracefully shuts down the server.
 * @param server The HTTP server instance to be shut down.
 */
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
  }, defaultConfig.GRACEFUL_SHUTDOWN?.timeout);
};

/**
 * registerEndpoints registers the endpoints defined in the CustomRouter.
 * @param router The CustomRouter instance containing the endpoints to be registered.
 */
const registerEndpoints = (router: CustomRouter) => {
  router.endpoints?.forEach((endpoint) => {
    const { path, method, controller, middleware } = endpoint;
    router[method](path, ...(middleware || []), controller);
  });
};

// Assign functions to AppConfig properties
defaultConfig.logAppInfo = logAppInfo;
defaultConfig.registerEndpoints = registerEndpoints;
defaultConfig.gracefulShutdown = gracefulShutdown;

export default defaultConfig;
