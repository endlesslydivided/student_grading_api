import { Inject, Injectable } from '@nestjs/common';
import sequelize, { Transaction } from 'sequelize';
import { Grade } from '../../grades/entities/grade.entity';
import { StudentReport } from '../../reports/types/reports.types';
import { Subject } from '../../subjects/entities/subject.entity';
import { Student } from '../entities/student.entity';
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
    return this.studentsRepository.findAll({
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
        ],
      },
      group: ['Student.id'],
    });
  }

  async findManyGradesByStudentId(id: string) {
    return this.studentsRepository.findByPk(id, {
      include: [
        {
          model: Grade,
          as: 'grades',
          where: {
            isLastSubmitted: true,
            value: { [Op.ne]: null },
          },
          attributes: ['value'],
          include: [
            {
              model: Subject,
              as: 'subject',
              attributes: ['name'],
            },
          ],
        },
      ],
    });
  }
}
