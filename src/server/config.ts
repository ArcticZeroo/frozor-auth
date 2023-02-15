import path from 'path';
import { getDirname } from '../util/dirname.js';

export const webserverPort = 4568;
export const rootFolderPath = path.resolve(getDirname(import.meta.url), '../../');
export const staticFolderPath = path.join(rootFolderPath, 'static');
export const reactPublicFolderPath = path.join(rootFolderPath, 'client/public');
export const serverPublicFolderPath = path.join(staticFolderPath, 'public');
