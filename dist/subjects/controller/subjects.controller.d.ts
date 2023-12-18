import { SubjectsService } from '../service/subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    getManySubjectGrades(): Promise<import("../entities/subject.entity").Subject[]>;
}
