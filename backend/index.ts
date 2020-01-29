import { assembleServer, runServer } from './assembleServer';
import { resetDatabase } from './model/resetDatabase';

async function run() {
  // While in development, resetting database on every run
  if (
    process.env.BACKEND_RESET_DATABASE === 'yes'
    && process.env.NODE_ENV !== 'production'
  ) {
    await resetDatabase();
  }

  // Run the app
  runServer(assembleServer());
}

run();
