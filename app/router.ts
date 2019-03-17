import { Application } from 'egg'

export default (app: Application) => {
    const { controller, router, io } = app

    // TODO Http Router
    router.get('/', controller.home.index)
    router.get('/alarms', controller.notify.historyAlarm)
    router.get('/snaps', controller.notify.historyRecord)

    router.get('/user/queryUsers', controller.user.queryUsers)
    router.get('/user/queryUser', controller.user.queryUser)

    router.get(
        '/organization/queryOrganizations',
        controller.organization.queryOrganizations
    )
    
    router.get(
        '/organization/queryOrganization',
        controller.organization.queryOrganization
    )

    router.get('/robot/queryRobots', controller.robot.queryRobots)
    router.get('/robot/queryRobot', controller.robot.queryRobot)

    router.post('/notify/passAlarm', controller.notify.passAlarm)
    router.post('/notify/passRecord', controller.notify.passRecord)

    router.post('/notify/communityPeople', controller.notify.communityPeople)
    router.post('/notify/unknownPeople', controller.notify.unknownPeople)

    // TODO sokect.io  Router
    io.of('/').route('passRecord', io.controller.notify.passRecord)
}
