import { Module } from '@nestjs/common';
import { GradesController } from './controller/grades.controller';
import { Grade } from './entities/grade.entity';
import { GradeRepository } from './repository/grade.repository';
import { GradesService } from './service/grades.service';

@Module({
  controllers: [GradesController],
  providers: [GradesService,{
    provide: Grade,
    useValue: Grade
  },GradeRepository,],
  exports:[GradesService]
})
export class GradesModule {}
