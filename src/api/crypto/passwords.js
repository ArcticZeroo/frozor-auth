const bcryptMaxChars = 72;
export const hashPassword = (salt, password) => {
    if (salt.length + password.length > bcryptMaxChars) {
        throw new Error('Too many characters!');
    }
};
//# sourceMappingURL=passwords.js.map