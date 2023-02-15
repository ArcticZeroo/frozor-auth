import { Context } from 'koa';
import { ApplicationRepository } from '../api/repository/app';
import { maximumPasswordLength, minimumPasswordLength } from '../constants/passwords.js';
import { FormFieldValue } from '../models/form';
import { ServiceContext } from '../models/koa.js';

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

export const validateClientId = (ctx: ServiceContext, clientId: FormFieldValue) => validateRequestValue(ctx, clientId, 'Client ID', clientId => Boolean(clientId.length) /*validator*/);
export const validateRedirectUri = (ctx: ServiceContext, redirectUri: FormFieldValue) => validateRequestValue(ctx, redirectUri, 'Redirect URI', isValidHttpsUrl /*validator*/);

interface IValidateOauthAppAndRedirectParams {
    ctx: ServiceContext,
    clientId: string,
    redirectUri: string
}

export const validateOauthAppAndRedirect = async ({ ctx, clientId, redirectUri }: IValidateOauthAppAndRedirectParams) => {
    const application = await ApplicationRepository.retrieveApplicationByClientId(clientId);

    if (!application) {
        ctx.throw(403, 'Forbidden: Invalid client id');
        return;
    }

    if (!isRedirectUriAllowed(redirectUri, application.allowedRedirectUris)) {
        ctx.throw(403, 'Forbidden: Disallowed redirect URI')
    }

    return application;
};
