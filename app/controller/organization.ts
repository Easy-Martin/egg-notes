import { Controller } from 'egg'
import { ResponseSuccess, ResponseError } from '../core/BaseResponse'
import StateCode from '../core/StateCode'


class OrganizationController extends Controller {
    public async queryOrganization() {
        let { ctx } = this
        const query = ctx.query
        if (!query.id) {
            ctx.body = new ResponseError(StateCode.PARAMS_ERROR)
        } else {
            let result = await ctx.dao.organization.queryOrganization(query.id)
            ctx.body = result
                ? new ResponseSuccess(StateCode.OK, result)
                : new ResponseSuccess(StateCode.PARAMS_ERROR)
        }
    }
    public async queryOrganizations() {
        const { ctx } = this
        let rows = await ctx.dao.organization.queryOrganizations()
        ctx.body = new ResponseSuccess(StateCode.OK, rows)
    }
}

export default OrganizationController
