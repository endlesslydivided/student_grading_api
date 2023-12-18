import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { StudentReport } from "../../reports/types/reports.types";
import { Student } from "../entities/student.entity";
import { Grade } from "../../grades/entities/grade.entity";
import sequelize from "sequelize";
import { Subject } from "../../subjects/entities/subject.entity";

@Injectable()
export class StudentsRepository {

    constructor(@Inject(Student) private studentsRepository: typeof Student){

    }


    async createMany(
        studentReport: StudentReport[],
        transaction:Transaction
    ): Promise<Student[]> {
        return this.studentsRepository.bulkCreate(studentReport as Student[],{
            transaction,
            include:[{
                model:Grade,
                as:'grades'
            }],
            updateOnDuplicate:['name']
        });
    }

    async findManyStudentsAverageGrades(): Promise<Student[]> {
        return this.studentsRepository.findAll({
            include:{
                model:Grade,
                as: 'grades',
                attributes:[],
            },
            group:['Student.id'],
            attributes:{
                include:[
                    [sequelize.literal('trunc(AVG(grades.value),2)'), 'averageGrade']
                ]
            },

        });
    }

    async findManyGradesByStudentId(id:string): Promise<Student[]> {
        return this.studentsRepository.findAll({
            where:{
                id
            },
            include:[{
                model:Grade,
                as: 'grades',
                include:[{
                    model: Subject,
                    as:"subject"
                }]
            }],
        });
    }

}
