import { Application } from 'egg'
import JWTStaticAction from '../core/JWTStaticAction'

export default {
    async createToken(params) {
        const _this: Application = this as any
        const config = _this.config.jwt
        return await JWTStaticAction.createToken(config.secret, params)
    },
    async verifyToken(token) {
        const _this: Application = this as any
        const config = _this.config.jwt
        return await JWTStaticAction.verifyToken(config.secret, token)
    }
}
