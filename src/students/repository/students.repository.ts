import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes, Transaction } from 'sequelize';
import { StudentReport } from '../../reports/types/reports.types';
import { Student } from '../entities/student.entity';
import { Grade } from '../../grades/entities/grade.entity';
import sequelize from 'sequelize';
import { Subject } from '../../subjects/entities/subject.entity';
import { Op } from 'sequelize';

@Injectable()
export class StudentsRepository {
  constructor(@Inject(Student) private studentsRepository: typeof Student) {}

  async createMany(
    studentReport: StudentReport[],
    transaction: Transaction,
  ): Promise<Student[]> {
    return this.studentsRepository.bulkCreate(studentReport as Student[], {
      transaction,
      include: [
        {
          model: Grade,
          as: 'grades',
        },
      ],
      updateOnDuplicate: ['name'],
    });
  }

  async findManyStudentsAverageGrades() {
    const students = await this.studentsRepository.sequelize.query(
      `
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
        `,
      { type: QueryTypes.SELECT, nest: true },
    );

    return students;
  }

  async findManyGradesByStudentId(id: string) {
    const students = await this.studentsRepository.sequelize.query(
      `
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
        `,
      { type: QueryTypes.SELECT, nest: true, replacements: { id } },
    );

    return students;
  }
}
