import path from 'path';
import { getDirname } from '../util/dirname.js';

export const webserverPort = 4568;
export const publicFolderPath = path.resolve(getDirname(import.meta.url), '../../public');