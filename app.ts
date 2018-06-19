import { Application } from 'egg'
import * as path from 'path'
import PG from './lib/pg'
import CreateKafka from './lib/kafka'
export default (app: Application & any) => {
    PG(app)
    CreateKafka(app)
    let dirs = app.loader
        .getLoadUnits()
        .map(unit => path.join(unit.path, 'app', 'dao'))

    app.loader.loadToContext(dirs, 'dao', {
        call: true,
        caseStyle: 'lower',
        fieldClass: 'daoClasses'
    })
}
