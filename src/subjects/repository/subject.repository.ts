import { Inject, Injectable } from "@nestjs/common";
import { ReportSubject } from "../../reports/types/reports.types";
import { Subject } from "../entities/subject.entity";
import { Op, Transaction } from "sequelize";
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

    async findManySubjectAvgMedGrades(): Promise<Subject[]> {
        return this.subjectRepository.findAll({
            include:{
                model:Grade,
                as: 'grades',
                where:{
                    createdAt: {
                        [Op.eq]: [sequelize.fn('MAX','graded.createdAt')]
                    }
                },
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

    async findManyGradesDecilesBySubjcteId(id:string): Promise<Subject> {
        return this.subjectRepository.findByPk(id,{
            include:{
                model:Grade,
                as: 'grades',
                where:{
                    createdAt: {
                        [Op.eq]: [sequelize.fn('MAX','graded.createdAt')]
                    }
                },
                attributes:[],
            },
            group:['Subject.id'],
            attributes:{
                include:[
                    [sequelize.literal(`
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
                    ]`),'deciles']
                ]
            },

        });
    }
    
}

