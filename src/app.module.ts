import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GradesModule } from './grades/grades.module';
import { FilesModule } from './reports/reports.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register(),
    DatabaseModule,
    StudentsModule, 
    GradesModule, 
    FilesModule, 
    SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
