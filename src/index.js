import { app } from './server/app.js';
import { webserverPort } from './server/config.js';
console.log('Starting server on port', webserverPort);
app.listen(webserverPort);
//# sourceMappingURL=index.js.map