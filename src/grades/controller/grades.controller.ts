import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradesService } from '../service/grades.service';


@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}


  @Get()
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(+id);
  }

}
