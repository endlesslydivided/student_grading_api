/// <reference types="multer" />
import { StudentsService } from "../../students/service/students.service";
import { Student } from "../../students/entities/student.entity";
import { SubjectsService } from "src/subjects/service/subjects.service";
import { Sequelize } from "sequelize-typescript";
export declare class ReportsService {
    private studentsService;
    private subjectsService;
    private readonly sequelizeInstance;
    constructor(studentsService: StudentsService, subjectsService: SubjectsService, sequelizeInstance: Sequelize);
    upsertReport(file: Express.Multer.File): Promise<void>;
    parseReportsCSV(file: Express.Multer.File): Promise<Array<Student>>;
}
