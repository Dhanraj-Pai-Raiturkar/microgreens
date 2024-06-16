import express from 'express';
import loadApplication from './loaders/express';
import MongooseSingleton from './loaders/mongoose';

const runServer = async (): Promise<void> => {
  const expServer = express();
  loadApplication({ app: expServer });
  new MongooseSingleton();
  console.log('mongoose loaded');
};

runServer();
