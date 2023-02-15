import { RouteBuilder } from '../../../models/route-builder.js';
import { loginRoutes } from './login.js';
import { signupRoutes } from './signup.js';

export const formRoutes: RouteBuilder = app => {
	loginRoutes(app);
	signupRoutes(app);
}