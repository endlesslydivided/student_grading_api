import { Model } from "sequelize-typescript";
import { Grade } from "../../grades/entities/grade.entity";
export declare class Subject extends Model<Subject> {
    id: string;
    name: string;
    grades: Grade[];
    medianGrade: Grade;
    averageGrade: Grade;
}
