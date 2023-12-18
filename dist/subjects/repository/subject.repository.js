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
exports.SubjectRepository = void 0;
const common_1 = require("@nestjs/common");
const subject_entity_1 = require("../entities/subject.entity");
const grade_entity_1 = require("../../grades/entities/grade.entity");
const sequelize_1 = require("sequelize");
let SubjectRepository = class SubjectRepository {
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
    async createMany(reportSubjects, transaction) {
        return this.subjectRepository.bulkCreate(reportSubjects, {
            transaction,
            updateOnDuplicate: ['name']
        });
    }
    async findManySubjectAvgMedGrades() {
        return this.subjectRepository.findAll({
            include: {
                model: grade_entity_1.Grade,
                as: 'grades',
                attributes: [],
            },
            group: ['Subject.id'],
            attributes: {
                include: [
                    [sequelize_1.default.literal('trunc(AVG(grades.value),2)'), 'averageGrade'],
                    [sequelize_1.default.literal(`cast (percentile_cont(0.5) within group(order by grades.value) as varchar)`), 'medialGrade']
                ]
            },
        });
    }
    async findManyGradesDecilesBySubjcteId(id) {
        return this.subjectRepository.findByPk(id, {
            include: {
                model: grade_entity_1.Grade,
                as: 'grades',
                attributes: [],
            },
            group: ['Subject.id'],
            attributes: {
                include: [
                    [sequelize_1.default.literal(`
                    ARRAY[
                        cast (percentile_cont(0.1) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.2) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.3) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.4) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.5) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.6) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.7) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.8) within group(order by grades.value) as varchar),
                        cast (percentile_cont(0.9) within group(order by grades.value) as varchar)
                    ]`), 'deciles']
                ]
            },
        });
    }
};
SubjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(subject_entity_1.Subject)),
    __metadata("design:paramtypes", [Object])
], SubjectRepository);
exports.SubjectRepository = SubjectRepository;
//# sourceMappingURL=subject.repository.js.map