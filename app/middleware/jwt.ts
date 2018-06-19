import { Context } from 'egg'
import JWTStaticAction from '../core/JWTStaticAction'
import { ResponseError } from '../core/BaseResponse'
import StateCode from '../core/StateCode'
import { JwtConfig } from '../../config/config.d'

export default (options: JwtConfig) => {
    return async function jwt(ctx: Context, next: Function) {
        const token: string = ctx.request.header['authorization']
        if (typeof options.ignore === 'function' && options.ignore() === true) {
            await next()
            return
        }
        if (Array.isArray(options.ignore) && options.ignore.indexOf(token) > -1) {
            await next()
            return
        }
        await JWTStaticAction.verifyToken(options.secret, token)
            .then(async () => {
                ctx.logger.info('[JWT] request token:', token)
                await next()
                return
            })
            .catch(e => {
                ctx.logger.error('[JWT]', token, e)
                ctx.body = new ResponseError(StateCode.INCORRECT_PERMISSIONS)
                return 
            })
    }
}
