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
    return this.subjectRepository.findAll({
      include: [
        {
          model: Grade,
          as: 'grades',
          where: {
            isLastSubmitted: true,
          },
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [sequelize.literal('round(AVG(grades.value))'), 'averageGrade'],
          [
            sequelize.literal(
              'percentile_cont(0.5) within group(order by grades.value)',
            ),
            'medialGrade',
          ],
        ],
      },
      group: ['Subject.id'],
    });
  }

  async findManyGradesDecilesBySubjcteId(id: string) {
    return this.subjectRepository.findByPk(id, {
      include: [
        {
          model: Grade,
          as: 'grades',
          where: {
            isLastSubmitted: true,
          },
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`array
            [
                percentile_cont(0.1) within group(order by grades.value),
                percentile_cont(0.2) within group(order by grades.value),
                percentile_cont(0.3) within group(order by grades.value),
                percentile_cont(0.4) within group(order by grades.value),
                percentile_cont(0.5) within group(order by grades.value),
                percentile_cont(0.6) within group(order by grades.value),
                percentile_cont(0.7) within group(order by grades.value),
                percentile_cont(0.8) within group(order by grades.value),
                percentile_cont(0.9) within group(order by grades.value)
            ]`),
            'deciles',
          ],
        ],
      },
      group: ['Subject.id'],
    });
  }
}
