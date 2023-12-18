import { Inject, Injectable } from '@nestjs/common';
import { ReportSubject } from '../../reports/types/reports.types';
import { Subject } from '../entities/subject.entity';
import { Op, QueryTypes, Transaction } from 'sequelize';
import { Grade } from 'src/grades/entities/grade.entity';
import sequelize from 'sequelize';

@Injectable()
export class SubjectRepository {
  constructor(@Inject(Subject) private subjectRepository: typeof Subject) {}

  async createMany(
    reportSubjects: ReportSubject[],
    transaction: Transaction,
  ): Promise<Subject[]> {
    return this.subjectRepository.bulkCreate(reportSubjects as Subject[], {
      transaction,
      updateOnDuplicate: ['name'],
    });
  }

  async findManySubjectAvgMedGrades() {
    const subjects = await this.subjectRepository.sequelize.query(
      `
            select "sorted"."subjectId" "id", "sorted"."name", 
            trunc(AVG(sorted.value),2) averageGrade,
            cast (percentile_cont(0.5) within group(order by sorted.value) as varchar) medialGrade
            from (
                    SELECT distinct on ("grades"."studentId","grades"."subjectId") "studentId","Subject"."id" "subjectId", "Subject"."name", "grades"."value", "grades"."createdAt"
                    from 	"Subjects" AS "Subject" 
                                LEFT OUTER JOIN 
                            "Grades" AS "grades" 
                                ON "Subject"."id" = "grades"."subjectId"
                    order by "grades"."studentId","grades"."subjectId", "grades"."createdAt" desc
                ) sorted
            GROUP by  id , "sorted"."name"
        `,
      { type: QueryTypes.SELECT, nest: true },
    );

    return subjects;
  }

  async findManyGradesDecilesBySubjcteId(id: string) {
    const subject = await this.subjectRepository.sequelize.query(
      `
            select "sorted"."subjectId" "id", "sorted"."name", 
                array
                [
                    cast (percentile_cont(0.1) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.2) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.3) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.4) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.5) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.6) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.7) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.8) within group(order by sorted.value) as varchar),
                    cast (percentile_cont(0.9) within group(order by sorted.value) as varchar)
                ] deciles
            from (
                    SELECT distinct on ("grades"."studentId") "studentId","Subject"."id" "subjectId", "Subject"."name", "grades"."value", "grades"."createdAt"
                    from 	"Subjects" AS "Subject" 
                                LEFT OUTER JOIN 
                            "Grades" AS "grades" 
                                ON "Subject"."id" = "grades"."subjectId"
                    WHERE "Subject"."id" = :id 
                    order by "grades"."studentId", "grades"."createdAt" desc
                ) sorted
            GROUP by  id , "sorted"."name"
        `,
      { type: QueryTypes.SELECT, nest: true, replacements: { id } },
    );

    return subject;
  }
}
