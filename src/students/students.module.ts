import { Module } from '@nestjs/common';
import { StudentsController } from './controller/students.controller';
import { Student } from './entities/student.entity';
import { StudentsRepository } from './repository/students.repository';
import { StudentsService } from './service/students.service';

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
