import { StudentsService } from '../service/students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getManyStudentsAverageGrades(): Promise<object[]>;
    getManyStudentGrades(id: string): Promise<object[]>;
}
