import { ReportSubject } from "../../reports/types/reports.types";
import { Subject } from "../entities/subject.entity";
import { Transaction } from "sequelize";
export declare class SubjectRepository {
    private subjectRepository;
    constructor(subjectRepository: typeof Subject);
    createMany(reportSubjects: ReportSubject[], transaction: Transaction): Promise<Subject[]>;
    findManySubjectAvgMedGrades(): Promise<Subject[]>;
    findManyGradesDecilesBySubjcteId(id: string): Promise<Subject>;
}
