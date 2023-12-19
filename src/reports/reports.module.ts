import { Module } from '@nestjs/common';
import { ReportsService } from './service/reports.service';
import { ReportsController } from './reports.controller';
import { StudentsModule } from 'src/students/students.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { GradesModule } from 'src/grades/grades.module';

@Module({
  imports: [StudentsModule, SubjectsModule, GradesModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class FilesModule {}
