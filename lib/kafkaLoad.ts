import * as path from 'path'
export default app => {
    let dirs = app.loader
        .getLoadUnits()
        .map(unit => path.join(unit.path, 'app', 'kafka'))

    app.kafka = app.kafka || {}
    new app.loader.FileLoader({
        directory: dirs,
        target: app.kafka,
        initializer: (kafka, opts) => {
            const fileName = path.basename(opts.path, path.extname(opts.path))
            Object.keys(kafka).map(action => {
                if (!app.kafka[fileName]) {
                    app.kafka[fileName] = {}
                }
                app.kafka[fileName][action] = kafka[action]
            })
            return null
        }
    }).load()
}
