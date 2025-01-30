class Config {
    getOrThrow(variable) {
        const key = process.env[variable];
        if (!key)
            throw new Error('Переменная окружения не найдена');
        return key;
    }
    get(variable) {
        return process.env[variable];
    }
}
export default new Config;
//# sourceMappingURL=config.js.map