import { Inject, Injectable } from "@nestjs/common";
import { ReportSubject } from "../../reports/types/reports.types";
import { Subject } from "../entities/subject.entity";
import { Transaction } from "sequelize";
import { Grade } from "src/grades/entities/grade.entity";
import sequelize from "sequelize";

@Injectable()
export class SubjectRepository {

    constructor(@Inject(Subject) private subjectRepository: typeof Subject){
    
    }

    async createMany(
        reportSubjects: ReportSubject[],
        transaction: Transaction
    ): Promise<Subject[]> {
        return this.subjectRepository.bulkCreate(reportSubjects as Subject[],{
            transaction, 
            updateOnDuplicate:['name']
        });
    }

    async findManySubjectGrades(): Promise<Subject[]> {
        return this.subjectRepository.findAll({
            include:{
                model:Grade,
                as: 'grades',
                attributes:[],
            },
            group:['Subject.id'],
            attributes:{
                include:[
                    [sequelize.literal('trunc(AVG(grades.value),2)'), 'averageGrade'],
                    [sequelize.literal(`cast (percentile_cont(0.5) within group(order by grades.value) as varchar)`),'medialGrade']
                ]
            },

        });
    }
    
}

