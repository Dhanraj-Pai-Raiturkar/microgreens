import express from 'express';
import loadApplication from './loaders/express';

const runServer = async (): Promise<void> => {
  const expServer = express();
  loadApplication({ app: expServer });
};

runServer();
