import { Transaction } from "sequelize";
import { StudentReport } from "../../reports/types/reports.types";
import { Student } from "../entities/student.entity";
export declare class StudentsRepository {
    private studentsRepository;
    constructor(studentsRepository: typeof Student);
    createMany(studentReport: StudentReport[], transaction: Transaction): Promise<Student[]>;
    findManyStudentsAverageGrades(): Promise<Student[]>;
    findManyGradesByStudentId(id: string): Promise<Student[]>;
}
