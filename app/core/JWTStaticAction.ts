import * as jwt from 'jsonwebtoken'

export default class JWTStaticAction {
    static createToken(KEY_SECRET: string, params: { [key: string]: any }) {
        let token = jwt.sign({ ...params }, KEY_SECRET, { expiresIn: '20s' })
        return Promise.resolve(token)
    }

    static createRefreshToken(KEY_SECRET: string, params: { [key: string]: any }) {
        let token = jwt.sign({ ...params }, KEY_SECRET, { expiresIn: '7d' })
        return Promise.resolve(token)
    }

    static verifyToken(KEY_SECRET: string, token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, KEY_SECRET, (err, decoded) => {
                err ? reject(err) : resolve(decoded)
            })
        })
    }
    static decodeToken(token: string) {
        let decoded = jwt.decode(token, { complete: true }) as {
            [key: string]: any
        }
        return Promise.resolve(decoded)
    }
}
