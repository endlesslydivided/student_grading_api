import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '../repository/subject.repository';
import { ReportSubject } from '../../reports/types/reports.types';
import { Transaction } from 'sequelize';

@Injectable()
export class SubjectsService {
  constructor(private subjectRepository: SubjectRepository){
        
  }
  
  upsertMany(reportsSubjects: Array<ReportSubject>,
    transaction: Transaction) {
    return this.subjectRepository.createMany(reportsSubjects,transaction);
  }

  findManySubjectsGrades() {
    return this.subjectRepository.findManySubjectGrades();
  }
}
