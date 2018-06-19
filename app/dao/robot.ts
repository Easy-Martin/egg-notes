import { BaseDao } from '../BaseDao'

class RobotDao extends BaseDao {
    public async queryRobot(id) {
        const { app } = this
        const pool = app.pg
        const querySQL = `SELECT * from t_robot where id = ${id}`
        try {
            const { rows } = await pool.query(querySQL)
            this.SQLLogger.info(querySQL)
            return rows[0]
        } catch (e) {
            this.SQLLogger.error(querySQL, e)
        }
    }
    public async queryRobots() {
        const { app } = this
        const pool = app.pg
        const querySQL = 'SELECT * from t_robot'
        try {
            const { rows } = await pool.query(querySQL)
            this.SQLLogger.info(querySQL)
            return rows
        } catch (e) {
            this.SQLLogger.error(querySQL, e)
            return null
        }
    }
}
export default RobotDao
