import { SubjectRepository } from '../repository/subject.repository';
import { ReportSubject } from '../../reports/types/reports.types';
import { Transaction } from 'sequelize';
export declare class SubjectsService {
    private subjectRepository;
    constructor(subjectRepository: SubjectRepository);
    upsertMany(reportsSubjects: Array<ReportSubject>, transaction: Transaction): Promise<import("../entities/subject.entity").Subject[]>;
    findManySubjectAvgMedGrades(): Promise<import("../entities/subject.entity").Subject[]>;
    findManyGradesDecilesBySubjcteId(id: string): Promise<import("../entities/subject.entity").Subject>;
}
