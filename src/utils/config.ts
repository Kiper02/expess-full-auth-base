class Config {
    getOrThrow(variable: string) {
        const key = process.env[variable];
        if(!key) throw new Error('Переменная окружения не найдена')
        return key;
    }

    get(variable: string) {
        return process.env[variable]
    }
}

export default new Config;