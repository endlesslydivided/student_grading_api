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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grade = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const student_entity_1 = require("../../students/entities/student.entity");
const subject_entity_1 = require("../../subjects/entities/subject.entity");
let Grade = class Grade extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, primaryKey: true }),
    __metadata("design:type", String)
], Grade.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER({ decimals: 3, precision: 3 }), allowNull: true }),
    __metadata("design:type", Number)
], Grade.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123e4567-e89b-12d3-a456-426614174000", description: "ID of student" }),
    (0, sequelize_typescript_1.ForeignKey)(() => student_entity_1.Student),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Grade.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Math", description: "ID of subject" }),
    (0, sequelize_typescript_1.ForeignKey)(() => subject_entity_1.Subject),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Grade.prototype, "subjectId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_entity_1.Student, {
        foreignKey: "studentId",
        constraints: true, onDelete: "set null", as: 'student'
    }),
    __metadata("design:type", student_entity_1.Student)
], Grade.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => subject_entity_1.Subject, {
        foreignKey: "subjectId",
        constraints: true, onDelete: "set null", as: 'subject'
    }),
    __metadata("design:type", subject_entity_1.Subject)
], Grade.prototype, "subject", void 0);
Grade = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true })
], Grade);
exports.Grade = Grade;
//# sourceMappingURL=grade.entity.js.map