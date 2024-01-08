import dotenv from 'dotenv'

dotenv.config()

export const EnvConfigs = {
    EXTERNAL_PORT: process.env.EXTERNAL_PORT ?? '9100',
    INTERNAL_PORT: process.env.INTERNAL_PORT ?? '9200',
    DOC_PORT: process.env.DOC_PORT ?? '9300',
    EXTERNAL_API_KEY: process.env.API_KEY_EXTERNAL ?? '',
    API_URL: process.env.API_URL ?? '',
    API_KEY_ADFECTUS: process.env.API_KEY_ADFECTUS ?? '',
    API_URL_ADFECTUS: process.env.API_URL_ADFECTUS ?? '',
}
