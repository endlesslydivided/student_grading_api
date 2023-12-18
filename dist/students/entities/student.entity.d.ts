import { Model } from "sequelize-typescript";
import { Grade } from "../../grades/entities/grade.entity";
export declare class Student extends Model<Student> {
    id: string;
    name: string;
    grades: Grade[];
}
