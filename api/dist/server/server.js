"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const env_1 = require("../common/env");
const mongoose = require("mongoose");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(env_1.ENV.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(env_1.ENV.server.port, () => {
                    resolve(this.application);
                    console.log('api running on http://localhost:3000');
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
