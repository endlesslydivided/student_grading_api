import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { StudentsService } from '../service/students.service';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/average-grades')
  @ApiOperation({ summary: 'Get average grades for all students' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  getManyStudentsAverageGrades() {
    try {
      return this.studentsService.findManyStudentsAverageGrades();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured during grades retrievement',
      );
    }
  }

  @Get('/:id/grades')
  @ApiOperation({ summary: 'Get many grades for one students' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  getManyStudentGrades(@Param('id') id: string) {
    try {
      return this.studentsService.findManyGradesByStudentId(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured during grades retrievement',
      );
    }
  }
}
