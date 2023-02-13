import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const getDirname = (importUrl) => dirname(fileURLToPath(importUrl));
//# sourceMappingURL=dirname.js.map