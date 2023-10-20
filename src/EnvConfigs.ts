const url_not_set = 'url not set'
import dotenv from 'dotenv'

import { getEnvToOperate } from './graphql/envToOperate'

dotenv.config()

export const EnvConfigs = {
    ENVIRONMENT: (process.env.ENVIRONMENT ?? 'dev') as 'dev' | 'test' | 'stage' | 'prod',
    PREDEFINED_HAO_SECRETS: process.env.PREDEFINED_HAO_SECRETS || '{}',
    DEVELOPMENT: !!process.env.DEVELOPMENT,
    DEBUG_KEY: process.env.DEBUG_KEY ?? 'debug',
    DEBUG_MODE: !!process.env.DEBUG_MODE,
    CONSOLE_DEBUG: !!process.env.CONSOLE_DEBUG,
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PREDEFINED_USER_SECRETS: process.env.PREDEFINED_USER_SECRETS ?? 'e30=',
    PREDEFINED_ENVIRONMENTS: process.env.PREDEFINED_ENVIRONMENTS ?? 'e30=',
    PORT: process.env.PORT ?? '8100',
    API_KEY: process.env.API_KEY ?? 'ASD9f7ge2rgSDFgBI8UliLdfHtkwegb67GF34MsUPosdqwssfw3466vds@3',
    API_URL: process.env.API_URL ?? '',
    TIME_TO_LIVE: process.env.TIME_TO_LIVE ?? '60',

    REFRESH_TOKEN_TTL_MIN: process.env.REFRESH_TOKEN_TTL_MIN || '60',
    TOKEN_TTL_SEC: process.env.TOKEN_TTL_SEC ?? '3600',

    TOKEN_THERAPIST_SALT_NONPROD: process.env.TOKEN_SALT_NONPROD,
    TOKEN_THERAPIST_SALT: process.env.TOKEN_SALT_PROD,

    LOCAL_CACHE_TTL: process.env.LOCAL_CACHE_TTL ?? '30',

    SRV_DIRECTORY: process.env.SRV_DIRECTORY ?? url_not_set,
    //SRV_ARTIFACT: process.env.SRV_ARTIFACT ?? url_not_set,
    //SRV_ARTIFACT_GQL: `${process.env.SRV_ARTIFACT ?? url_not_set}/v1/graphql`,
    SRV_PROXY: process.env.SRV_PROXY ?? '',
    SRV_AO_WRAPPER: process.env.PUBLIC_SRV_AO_WRAPPER ?? url_not_set,

    SIGNICAT_USERNAME: process.env.SIGNICAT_USERNAME ?? '',
    SIGNICAT_PASSWORD: process.env.SIGNICAT_PASSWORD ?? '',
    LINKMOBILITY_URL: process.env.LINKMOBILITY_URL ?? '',
    LINKMOBILITY_USER_NAME: process.env.LINKMOBILITY_USER_NAME ?? '',
    LINKMOBILITY_PASSWORD: process.env.LINKMOBILITY_PASSWORD ?? '',
    LINKMOBILITY_PLATFORM_ID: process.env.LINKMOBILITY_PLATFORM_ID ?? '',
    LINKMOBILITY_PLATFORMPARTNER_ID: process.env.LINKMOBILITY_PLATFORMPARTNER_ID ?? '',

    SALT_VERSION: process.env.SALT_VERSION ?? 2,
    //SRV_ARTIFACT_SECRET: process.env.SRV_ARTIFACT_SECRET,
    SRV_DIRECTORY_SECRET: process.env.SRV_DIRECTORY_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_PROD: process.env.JWT_SECRET_PROD ?? '',
    JWT_SECRET_NONPROD: process.env.JWT_SECRET_NONPROD ?? '',

    JWT_DEVICE_AUTHORIZATION_SECRET: process.env.JWT_DEVICE_AUTHORIZATION_SECRET,

    SIGNICAT_CLIENT_ID: process.env.SIGNICAT_CLIENT_ID,
    SIGNICAT_CLIENT_SECRET: process.env.SIGNICAT_CLIENT_SECRET,
    SIGNICAT_TOKEN: process.env.SIGNICAT_TOKEN,
    SIGNICAT_REDIRECT_URI: process.env.SIGNICAT_REDIRECT_URI,
    SIGNICAT_GRANT_TYPE: process.env.SIGNICAT_GRANT_TYPE,
    SIGNICAT_KEYS: process.env.SIGNICAT_KEYS,
}


