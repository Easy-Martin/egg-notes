export default {
    /**
     * 格式化socket emit 数据
     * @param action string
     * @param payload Object
     * @param metadata Object
     */
    parseMsg(action: string, payload: Object = {}, metadata: Object = {}) {
        const meta = Object.assign({}, { timestamp: Date.now() }, metadata)
        return {
            meta,
            data: { action, payload }
        }
    },

    /**
     * 获取本机ip地址
     */
    getIPAdress() {
        const interfaces = require('os').networkInterfaces()
        for (let devName in interfaces) {
            var iface = interfaces[devName]
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i]
                if (
                    alias.family === 'IPv4' &&
                    alias.address !== '127.0.0.1' &&
                    !alias.internal
                ) {
                    return alias.address
                }
            }
        }
    }
}
