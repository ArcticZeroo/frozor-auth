import { Context } from 'koa';
import { ApplicationRepository } from '../api/repository/app.js';
import { maximumPasswordLength, minimumPasswordLength } from '../constants/passwords.js';
import { FormFieldValue } from '../models/form.js';
import { StatefulContext } from '../models/koa.js';

// Email validation is hard. We'll allow any email with any characters before the last @, then any characters with a
// dot in between (for domain - we won't support local domains).
export const isValidEmail = (email: string): boolean => {
    return /^.+?@.+?[.].+?$/.test(email);
};

export const isValidPassword = (password: string): boolean => {
    return password.length >= minimumPasswordLength && password.length <= maximumPasswordLength;
};

/**
 * Validates a header in an HTTP request.
 * @param ctx
 * @param value
 * @param name
 * @param validator
 * @returns The validated header.
 */
export const validateRequestValue = (ctx: Context, value: undefined | string | string[], name: string, validator: (value: string) => boolean): string => {
    if (!value || typeof value !== 'string' || !validator(value)) {
        ctx.throw(400, `Bad Request: Invalid ${name}`);
    }
    return value;
}

export const isValidHttpsUrl = (rawUrl: string) => {
    try {
        const url = new URL(rawUrl);
        return url.protocol === 'https:';
    } catch {
        return false;
    }
};

const doesMatchRedirectUri = (actualUri: string, redirectUri: string): boolean => {
    // todo
    return true;
};

export const isRedirectUriAllowed = (actualUri: string, allowedUris: string[]): boolean => {
    return allowedUris.some(allowedUri => doesMatchRedirectUri(actualUri, allowedUri));
};

export const validateClientId = (ctx: StatefulContext, clientId: FormFieldValue) => validateRequestValue(ctx, clientId, 'Client ID', clientId => Boolean(clientId.length) /*validator*/);
export const validateRedirectUri = (ctx: StatefulContext, redirectUri: FormFieldValue) => validateRequestValue(ctx, redirectUri, 'Redirect URI', isValidHttpsUrl /*validator*/);

interface IValidateOauthAppAndRedirectParams {
    ctx: StatefulContext,
    clientId: string,
    redirectUri: string
}

export const validateOauthAppAndRedirect = async ({ ctx, clientId, redirectUri }: IValidateOauthAppAndRedirectParams) => {
    const application = await ApplicationRepository.retrieveApplicationByClientId(clientId);

    if (!application) {
        return ctx.throw(403, 'Forbidden: Invalid client id');
    }

    if (!isRedirectUriAllowed(redirectUri, application.allowedRedirectUris)) {
        return ctx.throw(403, 'Forbidden: Disallowed redirect URI')
    }

    return application;
};

interface IAuthFormData {
    email: string,
    password: string,
    clientId: string,
    redirectUri: string,
    scopes: string[]
}

export const validateAuthForm = (ctx: StatefulContext): IAuthFormData => {
    const formFields = ctx.state.form?.fields;

    if (!formFields) {
        ctx.throw(400, 'Bad Request: Invalid form data');
    }

    const email = validateRequestValue(ctx, formFields['email'], 'Email', isValidEmail /*validator*/);
    const password = validateRequestValue(ctx, formFields['password'], 'Password', isValidPassword /*validator*/);
    const clientId = validateClientId(ctx, formFields['client-id']);
    const redirectUri = validateRedirectUri(ctx, formFields['redirect-uri']);
    const scopes: string[] = [];

    return { email, password, clientId, redirectUri, scopes };
};