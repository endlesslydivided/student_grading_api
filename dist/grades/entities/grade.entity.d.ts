import { Model } from "sequelize-typescript";
import { Student } from "../../students/entities/student.entity";
import { Subject } from "../../subjects/entities/subject.entity";
export declare class Grade extends Model<Grade> {
    id: string;
    value: number;
    studentId: string;
    subjectId: string;
    student: Student;
    subject: Subject;
}
