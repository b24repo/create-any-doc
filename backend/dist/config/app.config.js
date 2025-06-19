"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    environment: process.env.NODE_ENV || 'development',
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        defaultModel: process.env.OPENAI_MODEL || 'gpt-4',
    },
    database: {
        url: process.env.DATABASE_URL,
    },
}));
//# sourceMappingURL=app.config.js.map