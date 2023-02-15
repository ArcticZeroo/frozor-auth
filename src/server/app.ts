import Koa from 'koa';
import json from 'koa-json';
import serve from 'koa-static';
import { registerRoutes } from '../routes/routes.js';
import { serverPublicFolderPath } from './config.js';

const app = new Koa();

app.use(json());

registerRoutes(app);

app.use(serve(serverPublicFolderPath));

export { app };