import express from './express';
import type { Express } from 'express';

export default async ({ app }: { app: Express }): Promise<void> => {
  // load all your configurations like servers, databases, cronjobs etc
  await express({ app });
  console.log('express loaded');
};
