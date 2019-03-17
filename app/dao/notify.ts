import { BaseDao } from '../BaseDao'

class NotifyDao extends BaseDao {
    public async saveAlarm() {
        const { app } = this
        const pool = app.pg
        const querySQL = 'SELECT * from t_user'
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

export default NotifyDao
