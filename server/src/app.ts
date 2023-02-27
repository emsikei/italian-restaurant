import 'dotenv/config';
import bcrypt from 'bcrypt';
import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import Fingerprint from 'express-fingerprint';

import { Server } from 'http';
import errorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import UserService from '@/resources/user/user.service';

class App {
    private express: Application;

    private port: number;

    private swaggerDocument = YAML.load('./swagger.yaml');

    constructor(controlllers: Controller[], port: number = 5000) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.registerAdminUser();
        this.initialiseMiddleware();
        this.initialiseControllers(controlllers);
        this.initialiseErrorHandling();
    }

    // eslint-disable-next-line class-methods-use-this
    private async initialiseDatabaseConnection(): Promise<void> {
        const { MONGO_URL } = process.env;

        if (process.env.NODE_ENV === 'test') return;

        mongoose.set('strictQuery', false);

        await mongoose.connect(MONGO_URL);
    }

    private initialiseMiddleware(): void {
        this.express.use(cors({ credentials: true, origin: true }));
        this.express.use(cookieParser());
        this.express.use(helmet());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(
            Fingerprint({
                // @ts-ignore
                parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders, Fingerprint.geoip],
            })
        );

        if (process.env.NODE_ENV === 'development') {
            this.express.use(morgan('dev'));
            this.express.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
        }
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api/v1', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private async registerAdminUser(): Promise<void> {
        const userService = new UserService();

        const admin = await userService.findByEmail(process.env.ADMIN_EMAIL);

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

        if (!admin) {
            await userService.create({
                name: process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
            });
        }
    }

    public getAppInstance(): Application {
        return this.express;
    }

    public listen(): Server {
        return this.express.listen(this.port, () => {
            console.log(`======= App listening on the port ${this.port} =======`);

            if (process.env.NODE_ENV === 'development') {
                console.log(`======= Swagger docs are available on http://localhost:${this.port}/api/v1/docs =======`);
            }
        });
    }

    // public stop(): void {
    //   if (!this.server) {
    //     throw Error("Server was not started");
    //   }
    //   this.server?.close();
    // }
}

export default App;
