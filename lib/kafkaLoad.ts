import * as path from 'path'
export default app => {
    let dirs = app.loader
        .getLoadUnits()
        .map(unit => path.join(unit.path, 'app', 'kafka'))
    app.kafka = app.kafka || {}
    app.loader.loadToApp(dirs, 'kafka')
}
