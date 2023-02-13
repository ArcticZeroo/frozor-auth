import * as Router from '@koa/router';
import { IKoaState } from './koa.js';

export type RouteBuilder = (router: Router<IKoaState>) => void;