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
exports.Subject = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const grade_entity_1 = require("../../grades/entities/grade.entity");
let Subject = class Subject extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, primaryKey: true }),
    __metadata("design:type", String)
], Subject.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => grade_entity_1.Grade, { as: 'grades', foreignKey: 'subjectId' }),
    __metadata("design:type", Array)
], Subject.prototype, "grades", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => grade_entity_1.Grade, { as: 'medianGrade' }),
    __metadata("design:type", grade_entity_1.Grade)
], Subject.prototype, "medianGrade", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => grade_entity_1.Grade, { as: 'averageGrade' }),
    __metadata("design:type", grade_entity_1.Grade)
], Subject.prototype, "averageGrade", void 0);
Subject = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true })
], Subject);
exports.Subject = Subject;
//# sourceMappingURL=subject.entity.js.map