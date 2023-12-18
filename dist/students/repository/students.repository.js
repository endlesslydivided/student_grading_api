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
exports.StudentsRepository = void 0;
const common_1 = require("@nestjs/common");
const student_entity_1 = require("../entities/student.entity");
const grade_entity_1 = require("../../grades/entities/grade.entity");
const sequelize_1 = require("sequelize");
const subject_entity_1 = require("../../subjects/entities/subject.entity");
let StudentsRepository = class StudentsRepository {
    constructor(studentsRepository) {
        this.studentsRepository = studentsRepository;
    }
    async createMany(studentReport, transaction) {
        return this.studentsRepository.bulkCreate(studentReport, {
            transaction,
            include: [{
                    model: grade_entity_1.Grade,
                    as: 'grades'
                }],
            updateOnDuplicate: ['name']
        });
    }
    async findManyStudentsAverageGrades() {
        return this.studentsRepository.findAll({
            include: {
                model: grade_entity_1.Grade,
                as: 'grades',
                attributes: [],
            },
            group: ['Student.id'],
            attributes: {
                include: [
                    [sequelize_1.default.literal('trunc(AVG(grades.value),2)'), 'averageGrade']
                ]
            },
        });
    }
    async findManyGradesByStudentId(id) {
        return this.studentsRepository.findByPk(id, {
            include: [{
                    model: grade_entity_1.Grade,
                    as: 'grades',
                    include: [{
                            model: subject_entity_1.Subject,
                            as: "subject"
                        }]
                }],
        });
    }
};
StudentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(student_entity_1.Student)),
    __metadata("design:paramtypes", [Object])
], StudentsRepository);
exports.StudentsRepository = StudentsRepository;
//# sourceMappingURL=students.repository.js.map