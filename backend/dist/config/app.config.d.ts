declare const _default: (() => {
    port: number;
    environment: string;
    openai: {
        apiKey: string;
        defaultModel: string;
    };
    database: {
        url: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    environment: string;
    openai: {
        apiKey: string;
        defaultModel: string;
    };
    database: {
        url: string;
    };
}>;
export default _default;
