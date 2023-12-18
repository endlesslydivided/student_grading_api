"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsModule = void 0;
const common_1 = require("@nestjs/common");
const subjects_service_1 = require("./service/subjects.service");
const subjects_controller_1 = require("./controller/subjects.controller");
const subject_repository_1 = require("./repository/subject.repository");
const subject_entity_1 = require("./entities/subject.entity");
let SubjectsModule = class SubjectsModule {
};
SubjectsModule = __decorate([
    (0, common_1.Module)({
        controllers: [subjects_controller_1.SubjectsController],
        providers: [subjects_service_1.SubjectsService, subject_repository_1.SubjectRepository, {
                provide: subject_entity_1.Subject,
                useValue: subject_entity_1.Subject
            }],
        exports: [subjects_service_1.SubjectsService]
    })
], SubjectsModule);
exports.SubjectsModule = SubjectsModule;
//# sourceMappingURL=subjects.module.js.map