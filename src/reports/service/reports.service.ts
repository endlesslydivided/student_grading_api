import {
  BadRequestException,
  Inject,
  Injectable
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { GradesService } from 'src/grades/service/grades.service';
import { SubjectsService } from 'src/subjects/service/subjects.service';
import { Student } from '../../students/entities/student.entity';
import { StudentsService } from '../../students/service/students.service';
import {
  ReportGrade,
  ReportSubject,
  StudentReport,
} from '../types/reports.types';



@Injectable()
export class ReportsService {
  constructor(
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private gradesService: GradesService,
    @Inject('DATABASE') private readonly sequelizeInstance: Sequelize,
  ) {}

  async parseReportsCSV(file: Express.Multer.File): Promise<Array<Student>> {

    if (!file) {
      throw new BadRequestException('File is empty');
    }
    
    try {
      return this.sequelizeInstance.transaction(async (transaction) => {

       
  
        const data = file.buffer.toString();
  
        const lines = data.split('\n').slice(0, -1);
        const studentsLines = lines.slice(1);
  
        const reportSubjects: Array<ReportSubject> = lines[0]
          ?.substring(1)
          ?.split(',')
          ?.map((subject) => ({ name: subject }));
  
        await this.gradesService.setLastSubmitted(
          transaction
        );
  
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
              isLastSubmitted:true
            });
          }
  
          studentReports.push({
            name,
            grades: gradesData,
          });
        });
  
        return this.studentsService.upsertMany(
          studentReports,
          transaction,
        );
    
      });
    } catch (error) {
      throw error;
    }
  }
}
