import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubjectsService } from '../service/subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}


    @Get('/average-grades')
    @ApiOperation({ summary: "Get average and median grades for all subjects" })
    @ApiResponse({ status: 200})
    @ApiBadRequestResponse({ description: "Bad Request" })
    getManySubjectGrades() {
      try{
        return this.subjectsService.findManySubjectsGrades();
      }
      catch (error) 
      {
        throw new InternalServerErrorException("An error occured during grader retrievement");
      }
    }

    
   
}
