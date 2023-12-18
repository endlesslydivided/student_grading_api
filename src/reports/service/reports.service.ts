import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ReportGrade,
  ReportSubject,
  StudentReport,
} from '../types/reports.types';
import { StudentsService } from '../../students/service/students.service';
import { Student } from '../../students/entities/student.entity';
import { SubjectsService } from 'src/subjects/service/subjects.service';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

type ParsedData = {
  reportSubjects: ReportSubject[];
  studentsData: StudentReport[];
};

@Injectable()
export class ReportsService {
  constructor(
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    @Inject('DATABASE') private readonly sequelizeInstance: Sequelize,
  ) {}

  async upsertReport(file: Express.Multer.File) {}

  async parseReportsCSV(file: Express.Multer.File): Promise<Array<Student>> {
    const transaction: Transaction = await this.sequelizeInstance.transaction();

    try {
      if (!file) {
        throw new BadRequestException('File is empty');
      }

      const data = file.buffer.toString();

      const lines = data.split('\n').slice(0, -1);
      const studentsLines = lines.slice(1);

      const reportSubjects: Array<ReportSubject> = lines[0]
        ?.substring(1)
        ?.split(',')
        ?.map((subject) => ({ name: subject }));

      const subjectEntities = await this.subjectsService.upsertMany(
        reportSubjects,
        transaction,
      );

      const studentReports: Array<StudentReport> = [];

      studentsLines.forEach((line) => {
        const studentData = line.split(',');

        const name = studentData[0];
        const grades = studentData.slice(1);

        const gradesData: Array<ReportGrade> = [];

        for (let i = 0; i < reportSubjects.length; i++) {
          gradesData.push({
            value: grades[i] === '' ? null : Number(grades[i]),
            subjectId: subjectEntities.find(
              (entity) => entity.name === reportSubjects[i].name,
            )?.id,
          });
        }

        studentReports.push({
          name,
          grades: gradesData,
        });
      });

      const studentReportsEntities = await this.studentsService.upsertMany(
        studentReports,
        transaction,
      );
      await transaction.commit();

      return studentReportsEntities;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
