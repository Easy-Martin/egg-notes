// for config.{env}.ts
export type DefaultConfig = PowerPartial<
    EggAppConfig & BizConfig & CustomConfig
>

export interface CustomConfig {
    jwt: JwtConfig
    gzip: GZipConfig
    kafka: KafkaConfig
}
// app special config scheme
export type BizConfig = {
    sourceUrl: string
}

//jwt
export type JwtConfig = {
    ignore: Array<string> & Function
    secret: string
}

//gzip
export type GZipConfig = {
    threshold: number
}

export type KafkaConfig = {
    clientId: string
    host: Array<string>
    topics: OffsetFetchRequest
    options: { [key: string]: any }
}
