import { nanoid } from 'nanoid';

const keySizes = {
    apiKey: 48,
    salt: 16,
    sessionId: 128
}

export const generateKey = () => nanoid(keySizes.apiKey);

export const generateSessionId = () => nanoid(keySizes.sessionId);

export const generateSalt = () => nanoid(keySizes.salt);