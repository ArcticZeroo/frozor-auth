import { Context, Request } from 'koa';
import { maximumPasswordLength, minimumPasswordLength } from '../constants/passwords.js';
import { IKoaState } from '../models/koa.js';

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