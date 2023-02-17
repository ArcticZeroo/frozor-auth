import Koa from 'koa';
import json from 'koa-json';
import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import { registerRoutes } from '../routes/routes.js';
import { reactClientFolderPath, serverPublicFolderPath } from './config.js';

const app = new Koa();

app.use(json());

registerRoutes(app);

app.use(serve(serverPublicFolderPath));
app.use(mount('/static', serve(path.join(reactClientFolderPath, 'build/static'))));

export { app };