"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("../../students/service/students.service");
const subjects_service_1 = require("../../subjects/service/subjects.service");
const sequelize_typescript_1 = require("sequelize-typescript");
let ReportsService = class ReportsService {
    constructor(studentsService, subjectsService, sequelizeInstance) {
        this.studentsService = studentsService;
        this.subjectsService = subjectsService;
        this.sequelizeInstance = sequelizeInstance;
    }
    async upsertReport(file) {
    }
    async parseReportsCSV(file) {
        var _a, _b, _c;
        const transaction = await this.sequelizeInstance.transaction();
        try {
            if (!file) {
                throw new common_1.BadRequestException("File is empty");
            }
            const data = file.buffer.toString();
            const lines = data.split("\n").slice(0, -1);
            const studentsLines = lines.slice(1);
            const reportSubjects = (_c = (_b = (_a = lines[0]) === null || _a === void 0 ? void 0 : _a.substring(1)) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.map((subject) => ({ name: subject }));
            const subjectEntities = await this.subjectsService.upsertMany(reportSubjects, transaction);
            let studentReports = [];
            studentsLines.forEach((line) => {
                var _a;
                let studentData = line.split(',');
                const name = studentData[0];
                const grades = studentData.slice(1);
                let gradesData = [];
                for (let i = 0; i < reportSubjects.length; i++) {
                    gradesData.push({
                        value: grades[i] === '' ? null : Number(grades[i]),
                        subjectId: (_a = subjectEntities.find((entity) => entity.name === reportSubjects[i].name)) === null || _a === void 0 ? void 0 : _a.id
                    });
                }
                studentReports.push({
                    name,
                    grades: gradesData
                });
            });
            const studentReportsEntities = await this.studentsService.upsertMany(studentReports, transaction);
            return studentReportsEntities;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};
ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('DATABASE')),
    __metadata("design:paramtypes", [students_service_1.StudentsService,
        subjects_service_1.SubjectsService,
        sequelize_typescript_1.Sequelize])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=files.service.js.map