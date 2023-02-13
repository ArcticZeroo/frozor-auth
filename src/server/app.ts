import json from 'koa-json';
import Koa from 'koa';
import { registerRoutes } from '../routes';

const app = new Koa();

app.use(json());

registerRoutes(app);

export { app };