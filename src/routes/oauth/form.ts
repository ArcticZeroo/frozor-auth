import { formParser } from '../../middleware/forms.js';
import { RouteBuilder } from '../../models/route-builder.js';
import { isValidEmail, isValidHttpsUrl, isValidPassword, validateRequestValue } from '../../util/validation.js';

export const formRoutes: RouteBuilder = app => {
    app.post('/login', formParser(), async ctx => {
        const formFields = ctx.state.form?.fields;

        if (!formFields) {
            ctx.throw(400, 'Bad Request: Invalid form data');
        }

        const email = validateRequestValue(ctx, formFields['email'], 'Email', isValidEmail /*validator*/);
        const password = validateRequestValue(ctx, formFields['password'], 'Password', isValidPassword /*validator*/);
        const clientId = validateRequestValue(ctx, formFields['client-id'], 'Client ID', clientId => Boolean(clientId.length) /*validator*/);
        const redirectUrl = validateRequestValue(ctx, formFields['redirect-url'], 'Redirect URL', isValidHttpsUrl /*validator*/);

        // check if client id exists, get app
        // check if redirect url is allowed
        // check if email exists, get user
        // check if password hashes match
        // generate access + refresh token
    });
};