import Koa from 'koa';
import json from 'koa-json';
import serve from 'koa-static';
import { registerRoutes } from '../routes/index.js';
import { publicFolderPath } from './config.js';

const app = new Koa();

app.use(json());

registerRoutes(app);

app.use(serve(publicFolderPath));

export { app };