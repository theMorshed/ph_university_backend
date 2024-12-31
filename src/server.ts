import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main().catch((err) => console.log(err));

process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected, shutting down....');
  if (server) {
    server.close(() => {
      process.exit(1);
    })
  }
  process.exit(1);
})

process.on('uncaughtException', () => {
  console.log('uncaughtException is detected, shutting down....');
  process.exit(1);
})