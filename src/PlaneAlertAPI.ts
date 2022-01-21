import {Logger} from "tslog";
import {createConnection} from "typeorm";
import {Plane} from "./entities/Plane";
import {Flight} from "./entities/Flight";
import express from 'express';
import {ListTrackedPlanesAction} from "./actions/ListTrackedPlanesAction";
import fs from "fs";
import {PlaneDetailsAction} from "./actions/PlaneDetailsAction";


class PlaneAlertMain {
    public log: Logger;
    public db: any;
    public app = express();
    public config: any;

    constructor() {
        this.log = new Logger();
        this.log.info("PlaneAlertAPI starting");
        this.config = this.loadConfig();
        this.initDatabase().then(async () => {
            if (this.db.isConnected) {
                this.log.info("Database initialized");
                this.setupRoutes();
                this.app.listen(3000, () => {
                    this.log.info(`API is listening on 3000`);
                });
            }
        });
    }

    async initDatabase() {
        try {
            this.db = await createConnection({
                type: "postgres",
                host: this.config['databaseHost'],
                port: 5432,
                username: this.config['databaseUsername'],
                password: this.config['databasePassword'],
                database: this.config['databaseName'],
                entities: [
                    Plane,
                    Flight,
                ],
                logging: false,
                synchronize: false,
            });
        } catch (e) {
            this.log.fatal(e);
            this.log.fatal("Database connection failed")
        }
    }

    private loadConfig() {
        return JSON.parse(fs.readFileSync("./config.json", "utf8"));
    }

    private setupRoutes() {
        this.app.get('/plane', ListTrackedPlanesAction.getRequest);
        this.app.get('/plane/:id', PlaneDetailsAction.byId);
    }
}

export const PlaneAlertAPI = new PlaneAlertMain();
