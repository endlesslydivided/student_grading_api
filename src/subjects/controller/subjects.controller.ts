import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubjectsService } from '../service/subjects.service';



@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get('/average-grades')
  @ApiOperation({ summary: 'Get average and median grades for all subjects' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  getManySubjectGrades() {
    try {
      return this.subjectsService.findManySubjectAvgMedGrades();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured during grader retrievement',
      );
    }
  }

  @Get('/:id/deciles-grades')
  @ApiOperation({ summary: 'Get many grades deciles for one subject' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  getManyStudentGrades(@Param('id') id: string) {
    try {
      return this.subjectsService.findManyGradesDecilesBySubjcteId(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured during grades retrievement',
      );
    }
  }
}
