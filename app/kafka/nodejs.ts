import { Application } from 'egg'

export interface TopicNodejsMethods {
    test1(message: { [key: string]: any }): Promise<any>
    test2(message: { [key: string]: any }): Promise<any>
}

export type TopicNodejs = Application & TopicNodejsMethods

export default {
    async test1(message) {
        this.io.of('/').emit('passAlarm', message)
    },
    async test2(message) {
        this.logger.info(message)
    }
} as TopicNodejs
