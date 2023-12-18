import { StudentsService } from '../service/students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getManyStudentsAverageGrades(): Promise<import("../entities/student.entity").Student[]>;
    getManyStudentGrades(id: string): Promise<import("../entities/student.entity").Student>;
}
