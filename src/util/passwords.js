import * as bcrypt from 'bcrypt';
import { minimumCostRounds, targetHashTime } from '../constants/passwords.js';
const testPassword = 'somepasswordhere';
const timeHashMsSync = (rounds) => {
    const startTime = Date.now();
    bcrypt.hashSync(testPassword, rounds);
    return Date.now() - startTime;
};
const findIdealCost = () => {
    let lastHashTimeMs = 0;
    let currentCost = minimumCostRounds;
    while (true) {
        const currentHashTimeMs = timeHashMsSync(currentCost);
        console.log(currentCost, 'took', currentHashTimeMs, 'ms to hash');
        if (currentHashTimeMs >= targetHashTime.inMilliseconds) {
            const currentDistance = currentHashTimeMs - targetHashTime.inMilliseconds;
            const lastDistance = targetHashTime.inMilliseconds - lastHashTimeMs;
            // If somehow costs are equal, we always want to increase the number of iterations.
            if (currentDistance <= lastDistance) {
                return currentCost;
            }
            else {
                return currentCost - 1;
            }
        }
        lastHashTimeMs = currentHashTimeMs;
        currentCost++;
    }
};
console.log('ideal cost:', findIdealCost());
//# sourceMappingURL=passwords.js.map