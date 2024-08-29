// File dynamicly populated during docker build, var correspond to docker .env
// (Made this way because client side ts dont have access to env var)

export const ENV = {
    expressUrl: '{{SEL_MANEGE_EXPRESS_URL}}'
}