import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { Grade } from "../grades/entities/grade.entity";
import { Student } from "../students/entities/student.entity";
import { Subject } from "../subjects/entities/subject.entity";

export const databaseProviders = [
    {
        inject: [ConfigService],
        provide: 'DATABASE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: configService.get<string>("POSTGRESQL_DATABASE_HOST"),
                port: configService.get<number>("POSTGRESQL_DATABASE_PORT"),
                username: configService.get<string>("POSTGRESQL_DATABASE_USERNAME"),
                password: configService.get<string>("POSTGRESQL_DATABASE_PASSWORD"),
                database: configService.get<string>("POSTGRESQL_DATABASE_DBNAME"),    
            });
            sequelize.addModels([Grade,Student,Subject]);
            await sequelize.sync();

            return sequelize;
        },
    },
  ];