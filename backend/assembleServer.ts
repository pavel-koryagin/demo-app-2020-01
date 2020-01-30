import { createServer, Server } from 'http';
import express, { Express, RequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createMealAction, deleteMealAction, getMealAction, listMealsAction, updateMealAction } from './actions/meal.actions';
import { authLoginAction, authRefreshAction, authRegisterAction } from './actions/auth.actions';
import UnexpectedCaseException from '../src/errors/UnexpectedCaseException';
import BadRequestException from '../src/errors/BadRequestException';
import { ValidationError } from 'sequelize';
import ForbiddenException from '../src/errors/ForbiddenException';
import NotFoundException from '../src/errors/NotFoundException';
import {
  createUserAction, deleteUserAction,
  getUserAction,
  listUsersAction,
  updateUserAction,
} from './actions/user.actions';

type Signals = NodeJS.Signals;

const port = process.env.PORT;

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

function wrapAsyncAction(fn: AsyncRequestHandler): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next)
      .then(value => {
        if (value !== undefined) {
          res.json(value);
        } else {
          if (!res.headersSent) {
            throw new UnexpectedCaseException();
          }
        }
      })
      .catch(e => {
        if (e instanceof BadRequestException) {
          res.status(400).json({ error: 'BAD_REQUEST', message: e.message });
          return;
        }
        if (e instanceof ValidationError) {
          const errors: { [field: string]: string } = {};
          e.errors.forEach(error => {
            if (!errors[error.path]) {
              errors[error.path] = error.message;
            }
          });
          res.status(400).json({ error: 'VALIDATION_FAILED', message: 'Validation Error', errors });
          return;
        }
        if (e instanceof ForbiddenException) {
          res.status(403).json({ error: 'FORBIDDEN', message: e.message });
          return;
        }
        if (e instanceof NotFoundException) {
          res.status(404).json({ error: 'NOT_FOUND', message: e.message });
          return;
        }
        res.status(500).json({ error: 'SERVER_ERROR', message: 'Internal Server Error' });
        console.error(e);
      });
  };
}

export function assembleServer(): Express {
  // Create express server
  const app = express();

  // Bind middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Bind actions
  app.post('/auth/login/', wrapAsyncAction(authLoginAction));
  app.post('/auth/register/', wrapAsyncAction(authRegisterAction));
  app.get('/auth/refresh/', wrapAsyncAction(authRefreshAction));

  app.get('/meals/', wrapAsyncAction(listMealsAction));
  app.get('/meals/:id/', wrapAsyncAction(getMealAction));
  app.post('/meals/', wrapAsyncAction(createMealAction));
  app.put('/meals/:id/', wrapAsyncAction(updateMealAction));
  app.delete('/meals/:id/', wrapAsyncAction(deleteMealAction));

  app.get('/users/', wrapAsyncAction(listUsersAction));
  app.get('/users/:id/', wrapAsyncAction(getUserAction));
  app.post('/users/', wrapAsyncAction(createUserAction));
  app.put('/users/:id/', wrapAsyncAction(updateUserAction));
  app.delete('/users/:id/', wrapAsyncAction(deleteUserAction));

  // Add terminating 404
  app.use((req, res) => {
    res.status(404);
    res.send({ error: 'NOT_FOUND', message: `There is no action ${req.method} at ${req.url}` });
  });

  return app;
}

export function runServer(app: Express) {
  // Start server
  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);

    // Bind others
    bindGracefulStop(httpServer);
  });
}

/** @see https://medium.com/@becintec/building-graceful-node-applications-in-docker-4d2cd4d5d392 */
function bindGracefulStop(server: Server) {
  // The signals we want to handle
  // NOTE: although it is tempting, the SIGKILL signal (9) cannot be intercepted and handled
  const signals: [Signals, number][] = [
    ['SIGHUP', 1],
    ['SIGINT', 2],
    ['SIGTERM', 15],
  ];

  // Do any necessary shutdown logic for our application here
  const shutdown = (signal: Signals, value: number) => {
    server.close(() => {
      console.log(`server stopped by ${signal} with value ${value}`);
      process.exit(128 + value);
    });
  };

  // Create a listener for each of the signals that we want to handle
  signals.forEach(([signal, value]) => {
    process.on(signal as Signals, () => {
      console.log(`process received a ${signal} signal`);
      shutdown(signal, value);
    });
  });
}
