import express from 'express';
// import loadApplication from './loaders/express';
// import mongodb from './loaders/mongodb';
import loadApplication from './loaders/index'

const runServer = async (): Promise<void> => {
  const expServer = express();
  await loadApplication({ app: expServer });
};

runServer();
