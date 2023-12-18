import sequelize from "sequelize";
import { Grade } from "../entities/grade.entity";
export declare class GradeRepository {
    private gradeRepository;
    constructor(gradeRepository: typeof Grade);
    findManyByStudentId(studentId: string): Promise<{
        rows: Grade[];
        count: number;
    }>;
    findMany(): Promise<{
        rows: Grade[];
        count: sequelize.GroupedCountResultItem[];
    }>;
}
