import { Controller } from 'egg'

class NotifyController extends Controller {
    public async passAlarm() {
        const { ctx, app } = this
        const nsp = app.io.of('/')
        const data = await ctx.service.notify.alarmData()
        if (!data) {
            ctx.body = { code: 500, msg: '报警记录推送失败，因为没有抓拍记录' }
        } else {
            nsp.emit('alarmEvent', data)
            ctx.body = { code: 200, msg: '报警记录推送成功' }
        }
    }

    public async passRecord() {
        const { ctx, app } = this
        const nsp = app.io.of('/')
        const data = await ctx.service.notify.recordData()
        nsp.emit('snapEvent', data)
        ctx.body = { code: 200, msg: '通行记录推送成功' }
    }

    public async historyAlarm() {
        const { ctx } = this
        const data = await ctx.service.notify.historyAlarm()
        ctx.body = data
    }
    public async historyRecord() {
        const { ctx } = this
        const data = await ctx.service.notify.historyRecord()
        ctx.body = data
    }

    public async communityPeople(){
        const { ctx, app } = this
        const nsp = app.io.of('/')
        const data = await ctx.service.notify.communityPeople()
        nsp.emit('community_people', data)
        ctx.body = { code: 200, msg: '通行记录推送成功' ,data}
    }

    public async unknownPeople(){
        const { ctx, app } = this
        const nsp = app.io.of('/')
        const data = await ctx.service.notify.unknownPeople()
        nsp.emit('unknown_people', data)
        ctx.body = { code: 200, msg: '通行记录推送成功' ,data}
    }
}

export default NotifyController
