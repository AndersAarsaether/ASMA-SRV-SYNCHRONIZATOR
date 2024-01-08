import dotenv from 'dotenv'

dotenv.config()

export const EnvConfigs = {
    PORT: process.env.PORT ?? '9100',
    API_KEY: process.env.API_KEY ?? '',
    API_URL: process.env.API_URL ?? '',
    API_KEY_ADFECTUS: process.env.API_KEY_ADFECTUS ?? '',
    API_URL_ADFECTUS: process.env.API_URL_ADFECTUS ?? '',
}
