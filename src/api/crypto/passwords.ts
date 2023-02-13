import bcrypt from 'bcrypt';
import { findIdealCost } from '../../util/passwords.js';

const saltRounds = findIdealCost();

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRounds);
};

interface IPasswordMatchArgs {
    hashedPassword: string;
    plaintextPassword: string;
}

export const doPasswordsMatch = async ({ hashedPassword, plaintextPassword }: IPasswordMatchArgs): Promise<boolean> => {
    return bcrypt.compare(plaintextPassword, hashedPassword);
};