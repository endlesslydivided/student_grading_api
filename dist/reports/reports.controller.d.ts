/// <reference types="multer" />
import { ReportsService } from './service/reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    loadReport(file: Express.Multer.File): Promise<import("../students/entities/student.entity").Student[]>;
}
