import { Module } from '@nestjs/common';
import { GradesRepository } from './repository/grades.repository';
import { GradesService } from './service/grades.service';
import { Grade } from './entities/grade.entity';

@Module({
    providers:[GradesRepository,GradesService, {
        provide: Grade,
        useValue: Grade,
    },],
    exports:[GradesService]
})
export class GradesModule {}
