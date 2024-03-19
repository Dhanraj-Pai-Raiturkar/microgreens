import express from './express';
import type { Express } from 'express';
import mongodb from './mongodb';

export default async ({ app }: { app: Express }): Promise<void> => {
  // load all your configurations like servers, databases, cronjobs etc
  await mongodb()
  await express({ app });
};
