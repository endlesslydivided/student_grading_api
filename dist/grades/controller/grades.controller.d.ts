import { GradesService } from '../service/grades.service';
export declare class GradesController {
    private readonly gradesService;
    constructor(gradesService: GradesService);
    findAll(): string;
    findOne(id: string): string;
}
