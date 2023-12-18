export interface ReportSubject {
    name: string;
}
export interface ReportGrade {
    value?: number;
    subjectId?: string;
}
export interface StudentReport {
    name: string;
    grades: Array<ReportGrade>;
}
