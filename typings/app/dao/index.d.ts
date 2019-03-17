import NotifyDao from '../../../app/dao/notify'
import UserDao from '../../../app/dao/user'
import OrganizationDao from '../../../app/dao/organization'
type Dao = {
    user: UserDao
    notify: NotifyDao
    organization :OrganizationDao
}

declare module 'egg' {
    export class Context {
        dao: Dao
    }
}
