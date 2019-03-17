import { Controller } from 'egg'

class NotifyController extends Controller {
    async passRecord() {
        const { ctx, app } = this
        const nsp = app.io.of('/')
        const socket = ctx.socket
        const client = socket.id
        let data = await ctx.service.notify.recordData()
        try {
            nsp.emit(
                'passRecord',
                ctx.helper.parseMsg('passRecord', data, { client })
            )
        } catch (error) {
            app.logger.error(error)
        }
    }
}

export default NotifyController
