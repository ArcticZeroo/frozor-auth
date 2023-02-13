import { nanoid } from 'nanoid';
const keySizes = {
    apiKey: 48,
    salt: 16
};
export const generateKey = () => nanoid(48);
export const generateSalt = () => nanoid(keySizes.salt);
//# sourceMappingURL=keygen.js.map