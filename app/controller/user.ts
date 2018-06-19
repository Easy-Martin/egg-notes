import { Controller } from 'egg'

class UserController extends Controller {
    public async queryUser() {
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
    public async queryUsers() {
        const { ctx } = this
        let rows = await ctx.dao.user.queryUsers()
        ctx.body = rows
    }
}

export default UserController
