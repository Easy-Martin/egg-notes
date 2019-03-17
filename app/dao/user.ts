import { BaseDao } from '../BaseDao'

class UserDao extends BaseDao {
    public async queryUsers() {
        const { app } = this
        const pool = app.pg
        const querySQL = 'SELECT * from t_user'
        try {
            const { rows } = await pool.query(querySQL)
            this.SQLLogger.info(querySQL)
            return rows
        } catch (e) {
            this.SQLLogger.error(querySQL, e)
            return null
        }
    }

    public async queryUser(id: string | number) {
        const { app } = this
        const pool = app.pg
        const querySQL = `SELECT * from t_user where id= ${id}`
        try {
            const { rows } = await pool.query(querySQL)
            this.SQLLogger.info(querySQL)
            return rows[0]
        } catch (e) {
            this.SQLLogger.error(querySQL, e)
            return null
        }
    }
}

export default UserDao
