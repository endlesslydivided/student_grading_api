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
const sequelize_1 = require("sequelize");
const student_entity_1 = require("../entities/student.entity");
const grade_entity_1 = require("../../grades/entities/grade.entity");
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
        const students = await this.studentsRepository.sequelize.query(`
            select "sorted"."studentId" "id", "sorted"."name", 
            trunc(AVG(sorted.value),2) averageGrade
            from (
                    SELECT distinct on ("grades"."subjectId","grades"."studentId") "subjectId","Student"."id" "studentId", "Student"."name", "grades"."value", "grades"."createdAt"
                    from 	"Students" AS "Student" 
                                LEFT OUTER JOIN 
                            "Grades" AS "grades" 
                                ON "Student"."id" = "grades"."studentId"
                    order by "grades"."subjectId","grades"."studentId", "grades"."createdAt" desc
                ) sorted
            GROUP by  id , "sorted"."name"
        `, { type: sequelize_1.QueryTypes.SELECT, nest: true });
        return students;
    }
    async findManyGradesByStudentId(id) {
        const students = await this.studentsRepository.sequelize.query(`
        select "sorted"."studentId" "id", "sorted"."name", ARRAY_AGG("sorted"."subjectName"|| ' ' || "sorted".value) as "grades"
        from (
                SELECT distinct on ("grades"."subjectId","grades"."studentId") "subjectId","subject"."name" "subjectName","Student"."id" "studentId", "Student"."name", "grades"."value", "grades"."createdAt"
                from 	"Students" AS "Student" 
                            LEFT OUTER JOIN 
                        "Grades" AS "grades" 
                            ON "Student"."id" = "grades"."studentId"
                          LEFT OUTER JOIN 
                        "Subjects" AS "subject" 
                            ON "subject"."id" = "grades"."subjectId"
                where "Student"."id" = :id
                order by "grades"."subjectId","grades"."studentId", "grades"."createdAt" desc
            ) sorted
        group by "sorted"."studentId", "sorted"."name"
        `, { type: sequelize_1.QueryTypes.SELECT, nest: true, replacements: { id } });
        return students;
    }
};
StudentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(student_entity_1.Student)),
    __metadata("design:paramtypes", [Object])
], StudentsRepository);
exports.StudentsRepository = StudentsRepository;
//# sourceMappingURL=students.repository.js.map