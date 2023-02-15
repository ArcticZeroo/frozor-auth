import path from 'path';
import { getDirname } from '../util/dirname.js';

export const webserverPort = 4568;
export const staticFolderPath = path.resolve(getDirname(import.meta.url), '../../static');
export const publicFolderPath = path.join(staticFolderPath, 'public');
