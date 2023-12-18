"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const reports_service_1 = require("./service/reports.service");
const reports_controller_1 = require("./reports.controller");
const students_module_1 = require("../students/students.module");
const subjects_module_1 = require("../subjects/subjects.module");
const grades_module_1 = require("../grades/grades.module");
let FilesModule = class FilesModule {
};
FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [students_module_1.StudentsModule, subjects_module_1.SubjectsModule, grades_module_1.GradesModule],
        controllers: [reports_controller_1.ReportsController],
        providers: [reports_service_1.ReportsService]
    })
], FilesModule);
exports.FilesModule = FilesModule;
//# sourceMappingURL=reports.module.js.map