import { BizConfig, CustomConfig } from './config.d'
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import * as path from 'path'

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig & CustomConfig> & BizConfig

    // app special config
    config.sourceUrl = `http://localhost${appInfo.name}`

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = `${appInfo.name}_${Math.random()}_${Date.now().valueOf()}`

    // add your config here
    config.middleware = ['jwt', 'gzip']

    config.jwt = {
        ignore: () => true, //['9527'],
        secret: 'KEY_TOKEN_SECRET'
    }

    config.gzip = {
        threshold: 1024 // 小于 1k 的响应体不压缩
    }

    config.view = {
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.html',
        mapping: {
            '.html': 'nunjucks'
        },
        root: [path.join(appInfo.baseDir, 'app/view')].join(',')
    }
    config.mysql = {
        // host
        host: '148.70.49.117',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: '12345678',
        // database
        database: 'mysql',
    }
    config.security = {
        csrf: {
            ignore: () => true
        }
    }
    config.cors = {
        origin: '*:*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,DELETE,PATCH,OPTIONS',
        credentials: true
    }

    config.pg = {
        client: {
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'postgres',
            port: '5432'
        }
    }
    config.customLogger = {
        sqlLogger: {
            file: path.join(
                appInfo.root,
                `logs/${appInfo.name}/${appInfo.name}-sql.log`
            )
        }
    }
    config.logger = {
        dir: `logs/${appInfo.name}`,
        consoleLevel: 'DEBUG',
        level: 'DEBUG'
    }

    config.io = {
        init: { wsEngine: 'uws', origins: '*' },
        namespace: {
            '/': {
                connectionMiddleware: [],
                packetMiddleware: []
            }
        }
    }

    config.kafka = {
        clientId: 'egg-kakfa-id',
        host: ['localhost:2181'],
        topics: [
            {
                topic: 'nodejs',
                partition: 0,
                offset: 0
            },
            {
                topic: 'test',
                partition: 0,
                offset: 0
            }
        ],
        options: {
            id: 'egg-consumer-nodejs',
            groupId: 'kafka-node-group',
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            fromOffset: false,
        }
    }
    return config
}
