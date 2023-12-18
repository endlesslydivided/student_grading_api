"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const sequelize_typescript_1 = require("sequelize-typescript");
const grade_entity_1 = require("../grades/entities/grade.entity");
const student_entity_1 = require("../students/entities/student.entity");
const subject_entity_1 = require("../subjects/entities/subject.entity");
exports.databaseProviders = [
    {
        inject: [config_1.ConfigService],
        provide: 'DATABASE',
        useFactory: async (configService) => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'postgres',
                host: configService.get("POSTGRESQL_DATABASE_HOST"),
                port: configService.get("POSTGRESQL_DATABASE_PORT"),
                username: configService.get("POSTGRESQL_DATABASE_USERNAME"),
                password: configService.get("POSTGRESQL_DATABASE_PASSWORD"),
                database: configService.get("POSTGRESQL_DATABASE_DBNAME"),
            });
            sequelize.addModels([grade_entity_1.Grade, student_entity_1.Student, subject_entity_1.Subject]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=postgresql.provider.js.map