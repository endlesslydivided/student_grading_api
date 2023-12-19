import { Injectable } from '@nestjs/common';
import { StudentReport } from 'src/reports/types/reports.types';
import { StudentsRepository } from '../repository/students.repository';
import { Transaction } from 'sequelize';

@Injectable()
export class StudentsService {
  constructor(private studentRepository: StudentsRepository) {}

  upsertMany(reportData: Array<StudentReport>, transaction: Transaction) {
    return this.studentRepository.createMany(reportData, transaction);
  }

  findManyStudentsAverageGrades() {
    return this.studentRepository.findManyStudentsAverageGrades();
  }

  findManyGradesByStudentId(id: string) {
    return this.studentRepository.findManyGradesByStudentId(id);
  }
}
