import { SubjectsService } from '../service/subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    getManySubjectGrades(): Promise<object[]>;
    getManyStudentGrades(id: string): Promise<object[]>;
}
