import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Common")
@Controller()
export class AppController {

  @ApiOperation({ summary: "Health check server" })
  @ApiResponse({ status: 200, description: "Server works" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @Get("health")
  ping() {
    return { description: "Server works" };
  }
}
