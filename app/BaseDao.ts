import { BaseContextClass } from 'egg'

export class BaseDao extends BaseContextClass {
    get SQLLogger() {
        const logger = this.ctx.getLogger('sqlLogger')
        return {
            info: (msg: any, ...args: any[]): void => {
                logger.info('[DAO]', msg, ...args)
            },
            warn: (msg: any, ...args: any[]): void => {
                logger.warn('[DAO]', msg, ...args)
            },
            debug: (msg: any, ...args: any[]): void => {
                logger.debug('[DAO]', msg, ...args)
            },
            error: (msg: any, ...args: any[]): void => {
                logger.error('[DAO]', msg, ...args)
            }
        }
    }
}
