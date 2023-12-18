import { Module } from '@nestjs/common';
import { SubjectsService } from './service/subjects.service';
import { SubjectsController } from './controller/subjects.controller';
import { SubjectRepository } from './repository/subject.repository';
import { Subject } from './entities/subject.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SubjectsController],
  providers: [
    SubjectsService,
    SubjectRepository,
    {
      provide: Subject,
      useValue: Subject,
    },
  ],
  exports: [SubjectsService],
})
export class SubjectsModule {}
