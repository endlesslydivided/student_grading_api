import { Module } from '@nestjs/common';
import { StudentsService } from './service/students.service';
import { StudentsController } from './controller/students.controller';
import { StudentsRepository } from './repository/students.repository';
import { DatabaseModule } from '../database/database.module';
import { Student } from './entities/student.entity';

@Module({
  controllers: [StudentsController],
  providers: [
    StudentsService,
    StudentsRepository,
    {
      provide: Student,
      useValue: Student,
    },
  ],
  exports: [StudentsService],
})
export class StudentsModule {}
