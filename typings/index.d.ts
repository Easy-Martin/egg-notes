import * as Pg from '@types/pg'
declare module 'egg' {
    interface Application {
        pg: Pg.Pool
    }
}
