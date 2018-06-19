import { BaseDao } from '../BaseDao'
import { ResponseError } from '../core/BaseResponse'
import StateCode from '../core/StateCode'

class OrganizationDao extends BaseDao {
    public async queryOrganizations() {
        const { app, ctx } = this
        const pool = app.pg
        const querySQL = 'SELECT * from t_organization'
        try {
            const { rows } = await pool.query(querySQL)
            this.SQLLogger.info(querySQL)
            return rows
        } catch (e) {
            this.SQLLogger.error(querySQL, e)
            ctx.body = new ResponseError(StateCode.SQL_ERROR)
        }
    }

    public async queryOrganization(id: string | number) {
        const { app, ctx } = this
        const pool = app.pg
        const querySQL = `SELECT * from t_organization where id= ${id}`
        try {
            const { rows } = await pool.query(querySQL)
            this.SQLLogger.info(querySQL)
            return rows[0]
        } catch (e) {
            this.SQLLogger.error(querySQL, e)
            ctx.body = new ResponseError(StateCode.SQL_ERROR)
        }
    }
}

export default OrganizationDao
