import { StudentReport } from 'src/reports/types/reports.types';
import { StudentsRepository } from '../repository/students.repository';
import { Transaction } from 'sequelize';
export declare class StudentsService {
    private studentRepository;
    constructor(studentRepository: StudentsRepository);
    upsertMany(reportData: Array<StudentReport>, transaction: Transaction): Promise<import("../entities/student.entity").Student[]>;
    findManyStudentsAverageGrades(): Promise<import("../entities/student.entity").Student[]>;
    findManyGradesByStudentId(id: string): Promise<import("../entities/student.entity").Student[]>;
}
