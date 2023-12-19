import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReportsService } from './service/reports.service';


@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Load new student grades report' })
  @ApiResponse({
    status: 201,
    description: 'Report has been successfully loaded',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  loadReport(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.reportsService.parseReportsCSV(file);
    } catch (error) {
      if (typeof error !== typeof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occured during file writing',
      );
    }
  }
}
