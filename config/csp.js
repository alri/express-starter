const helmet = require('helmet');

module.exports={
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src":["'self'"],
        "script-src" : ["'self'","'unsafe-inline'","'unsafe-eval'"],
        "style-src":["'self'","'unsafe-inline'"],
        "object-src": ["'self'"],
        "font-src":["'self'"],
        "connect-src": ["'self'","ws://localhost:3000"],
      },
    reportOnly: false,
}