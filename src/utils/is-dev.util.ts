import config from "./config.js"

export const isDev = () => {
    const mode =config.getOrThrow('NODE_ENV')
    return mode === 'development' ? true : false
}