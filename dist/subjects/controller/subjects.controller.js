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
exports.SubjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subjects_service_1 = require("../service/subjects.service");
let SubjectsController = class SubjectsController {
    constructor(subjectsService) {
        this.subjectsService = subjectsService;
    }
    getManySubjectGrades() {
        try {
            return this.subjectsService.findManySubjectAvgMedGrades();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("An error occured during grader retrievement");
        }
    }
    getManyStudentGrades(id) {
        try {
            return this.subjectsService.findManyGradesDecilesBySubjcteId(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("An error occured during grades retrievement");
        }
    }
};
__decorate([
    (0, common_1.Get)('/average-grades'),
    (0, swagger_1.ApiOperation)({ summary: "Get average and median grades for all subjects" }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubjectsController.prototype, "getManySubjectGrades", null);
__decorate([
    (0, common_1.Get)('/:id/deciles-grades'),
    (0, swagger_1.ApiOperation)({ summary: "Get many grades deciles for one subject" }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad Request" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubjectsController.prototype, "getManyStudentGrades", null);
SubjectsController = __decorate([
    (0, common_1.Controller)('subjects'),
    __metadata("design:paramtypes", [subjects_service_1.SubjectsService])
], SubjectsController);
exports.SubjectsController = SubjectsController;
//# sourceMappingURL=subjects.controller.js.map