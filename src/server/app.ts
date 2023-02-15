import Koa from 'koa';
import json from 'koa-json';
import { registerRoutes } from '../routes/index.js';

const app = new Koa();

app.use(json());

registerRoutes(app);

export { app };