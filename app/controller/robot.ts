import { Controller } from 'egg'

class RobotController extends Controller {
    public async queryRobot() {
        let { ctx } = this
        const query = ctx.query
        if (!query.id) {
            ctx.body = {
                msg: '缺少传入参数'
            }
        } else {
            let rows = await ctx.dao.user.queryUser(query.id)
            ctx.body = rows
        }
    }
    
    public async queryRobots() {
        const { ctx } = this
        let rows = await ctx.dao.user.queryUsers()
        ctx.body = rows
    }
}

export default RobotController
