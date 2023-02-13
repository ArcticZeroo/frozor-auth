import * as bcrypt from 'bcrypt';
import { minimumCostRounds, minimumHashTime } from '../constants/passwords.js';

const testPassword = 'somepasswordhere';

const timeHashMsSync = (rounds: number): number => {
    const startTime = Date.now();
    bcrypt.hashSync(testPassword, rounds);
    return Date.now() - startTime;
}

export const findIdealCost = () => {
    let lastHashTimeMs = 0;
    let currentCost = minimumCostRounds;
    while (true) {
        const currentHashTimeMs = timeHashMsSync(currentCost);

        console.log(currentCost, 'took', currentHashTimeMs, 'ms to hash');

        if (currentHashTimeMs >= minimumHashTime.inMilliseconds) {
            return currentCost;
        }

        lastHashTimeMs = currentHashTimeMs;
        currentCost++;
    }
};