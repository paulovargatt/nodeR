import * as restify from 'restify'
import {ENV} from '../common/env'
import { Router } from '../common/router';
import * as mongoose from 'mongoose'

export class Server{
    application: restify.Server

    initializeDb(){
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(ENV.db.url, {
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject) => {
            try{
                this.application = restify.createServer({
                    name: 'api',
                    version: '1.0.0'
                })
                
                this.application.use(restify.plugins.queryParser())
                
                for(let router of routers){
                    router.applyRoutes(this.application)
                }

                this.application.listen(ENV.server.port, () => {
                    resolve(this.application)
                    console.log('api running on http://localhost:3000')
                })
            }
            catch(err){
                reject(err)
            }
        })
    }


    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this))
    }
}