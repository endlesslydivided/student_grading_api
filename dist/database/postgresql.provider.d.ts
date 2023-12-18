import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
export declare const databaseProviders: {
    inject: (typeof ConfigService)[];
    provide: string;
    useFactory: (configService: ConfigService) => Promise<Sequelize>;
}[];
