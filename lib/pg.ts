import * as PG from 'pg'
import * as assert from 'assert'
import { Application } from 'egg'

export default app => {
    app.addSingleton('pg', createPostgreSQL)
}

function createPostgreSQL(config: any, app: Application) {
    assert(config.host && config.port && config.user && config.database)
    const pool = new PG.Pool(config)
    pool.on('connect', async client => {
        app.coreLogger.debug('[egg-pq] init instance success')
        const { rows } = await client.query('select now() as currentTime;')
        app.coreLogger.info(
            `[egg-pq] init instance success,${rows[0].currentTime}}`
        )
    })
    app.beforeStart(async () => {
        const { rows } = await pool.query('select now() as currentTime;')
        app.coreLogger.info(
            `[egg-pq] init instance success,${rows[0].currentTime}}`
        )
    })
    return pool
}
